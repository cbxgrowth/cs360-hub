import { supabase } from '@/integrations/supabase/client';
import type { ChatMessage, ChatConversation, ChatNotification, TypingIndicator } from '@/types/chat';

class ChatService {
  private wsConnection: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private messageHandlers: Set<(message: ChatMessage) => void> = new Set();
  private typingHandlers: Set<(indicator: TypingIndicator) => void> = new Set();

  connect(userId: string): void {
    const wsUrl = `${import.meta.env.VITE_WS_URL || 'ws://localhost:3001'}/chat?userId=${userId}`;
    
    try {
      this.wsConnection = new WebSocket(wsUrl);

      this.wsConnection.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.wsConnection.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleWebSocketMessage(data);
      };

      this.wsConnection.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.wsConnection.onclose = () => {
        console.log('WebSocket closed');
        this.handleReconnect(userId);
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }
  }

  disconnect(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
  }

  private handleReconnect(userId: string): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      
      console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
      
      setTimeout(() => {
        this.connect(userId);
      }, delay);
    }
  }

  private handleWebSocketMessage(data: any): void {
    switch (data.type) {
      case 'message':
        this.messageHandlers.forEach(handler => handler(data.payload));
        break;
      case 'typing':
        this.typingHandlers.forEach(handler => handler(data.payload));
        break;
      case 'notification':
        this.handleNotification(data.payload);
        break;
    }
  }

  onMessage(handler: (message: ChatMessage) => void): () => void {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  onTyping(handler: (indicator: TypingIndicator) => void): () => void {
    this.typingHandlers.add(handler);
    return () => this.typingHandlers.delete(handler);
  }

  async createConversation(userId: string, clientId?: string): Promise<{ data: ChatConversation | null; error: string | null }> {
    try {
      const conversation: Omit<ChatConversation, 'id' | 'created_at' | 'updated_at'> = {
        user_id: userId,
        client_id: clientId,
        status: 'active',
        priority: 'medium',
        unread_count: 0
      };

      const { data, error } = await supabase
        .from('chat_conversations')
        .insert(conversation)
        .select()
        .single();

      if (error) throw error;
      return { data: data as ChatConversation, error: null };
    } catch (error: any) {
      console.error('Error creating conversation:', error);
      return { data: null, error: error.message };
    }
  }

  async getConversations(userId: string, status?: string): Promise<{ data: ChatConversation[] | null; error: string | null }> {
    try {
      let query = supabase
        .from('chat_conversations')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { data: data as ChatConversation[], error: null };
    } catch (error: any) {
      console.error('Error fetching conversations:', error);
      return { data: null, error: error.message };
    }
  }

  async sendMessage(message: Omit<ChatMessage, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: ChatMessage | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert(message)
        .select()
        .single();

      if (error) throw error;

      if (this.wsConnection && this.wsConnection.readyState === WebSocket.OPEN) {
        this.wsConnection.send(JSON.stringify({
          type: 'message',
          payload: data
        }));
      }

      await supabase
        .from('chat_conversations')
        .update({
          updated_at: new Date().toISOString()
        })
        .eq('id', message.conversation_id);

      return { data: data as ChatMessage, error: null };
    } catch (error: any) {
      console.error('Error sending message:', error);
      return { data: null, error: error.message };
    }
  }

  async getMessages(conversationId: string, limit: number = 50): Promise<{ data: ChatMessage[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data: (data as ChatMessage[]).reverse(), error: null };
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      return { data: null, error: error.message };
    }
  }

  async markAsRead(conversationId: string, userId: string): Promise<{ error: string | null }> {
    try {
      await supabase
        .from('chat_messages')
        .update({ read: true })
        .eq('conversation_id', conversationId)
        .neq('sender_id', userId)
        .eq('read', false);

      await supabase
        .from('chat_conversations')
        .update({ unread_count: 0 })
        .eq('id', conversationId);

      return { error: null };
    } catch (error: any) {
      console.error('Error marking as read:', error);
      return { error: error.message };
    }
  }

  sendTypingIndicator(conversationId: string, userId: string, userName: string, isTyping: boolean): void {
    if (this.wsConnection && this.wsConnection.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify({
        type: 'typing',
        payload: {
          conversation_id: conversationId,
          user_id: userId,
          user_name: userName,
          is_typing: isTyping
        }
      }));
    }
  }

  async closeConversation(conversationId: string): Promise<{ error: string | null }> {
    try {
      await supabase
        .from('chat_conversations')
        .update({ status: 'closed' })
        .eq('id', conversationId);

      return { error: null };
    } catch (error: any) {
      console.error('Error closing conversation:', error);
      return { error: error.message };
    }
  }

  private handleNotification(notification: ChatNotification): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/logo.png'
      });
    }
  }

  async requestNotificationPermission(): Promise<boolean> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }
}

export const chatService = new ChatService();
