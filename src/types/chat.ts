export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  sender_type: 'user' | 'client' | 'agent' | 'bot';
  content: string;
  type: 'text' | 'image' | 'file' | 'system';
  metadata?: Record<string, any>;
  read: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChatConversation {
  id: string;
  user_id: string;
  client_id?: string;
  agent_id?: string;
  status: 'active' | 'waiting' | 'closed' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  subject?: string;
  last_message?: ChatMessage;
  unread_count: number;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface ChatNotification {
  id: string;
  user_id: string;
  type: 'new_message' | 'conversation_assigned' | 'conversation_closed' | 'mention';
  title: string;
  message: string;
  conversation_id?: string;
  read: boolean;
  created_at: string;
}

export interface TypingIndicator {
  conversation_id: string;
  user_id: string;
  user_name: string;
  is_typing: boolean;
}
