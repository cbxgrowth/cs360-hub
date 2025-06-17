
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export type Tables = Database['public']['Tables'];

export class BaseService<T extends keyof Tables> {
  protected tableName: T;

  constructor(tableName: T) {
    this.tableName = tableName;
  }

  async findAll(userId?: string) {
    try {
      let query = supabase.from(this.tableName).select('*');
      
      if (userId) {
        query = query.eq('user_id' as any, userId);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error(`Error fetching ${this.tableName}:`, error);
      return { data: null, error: error.message };
    }
  }

  async findById(id: string) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id' as any, id)
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error(`Error fetching ${this.tableName} by ID:`, error);
      return { data: null, error: error.message };
    }
  }

  async create(item: Omit<Tables[T]['Insert'], 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .insert(item as any)
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error(`Error creating ${this.tableName}:`, error);
      return { data: null, error: error.message };
    }
  }

  async update(id: string, updates: Partial<Tables[T]['Update']>) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update(updates as any)
        .eq('id' as any, id)
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error(`Error updating ${this.tableName}:`, error);
      return { data: null, error: error.message };
    }
  }

  async delete(id: string) {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('id' as any, id);
      
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error(`Error deleting ${this.tableName}:`, error);
      return { error: error.message };
    }
  }

  async bulkUpdate(ids: string[], updates: Partial<Tables[T]['Update']>) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update(updates as any)
        .in('id' as any, ids)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error(`Error bulk updating ${this.tableName}:`, error);
      return { data: null, error: error.message };
    }
  }
}
