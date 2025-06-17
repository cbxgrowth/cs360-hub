export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cities: {
        Row: {
          country_id: number | null
          id: number
          name: string
        }
        Insert: {
          country_id?: number | null
          id?: never
          name: string
        }
        Update: {
          country_id?: number | null
          id?: never
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "cities_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          acquisition_channel: string | null
          billing_status: string | null
          cac: number | null
          churn_probability: number | null
          company: string | null
          contract_end: string | null
          contract_start: string | null
          created_at: string | null
          email: string | null
          engagement_score: number | null
          feature_adoption: number | null
          health_score: number | null
          id: string
          last_interaction: string | null
          last_login: string | null
          ltv: number | null
          mrr: number | null
          name: string
          phone: string | null
          plan: string | null
          risk_score: number | null
          satisfaction_score: number | null
          segment: string | null
          status: string | null
          support_tickets: number | null
          tier: string | null
          trust: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          acquisition_channel?: string | null
          billing_status?: string | null
          cac?: number | null
          churn_probability?: number | null
          company?: string | null
          contract_end?: string | null
          contract_start?: string | null
          created_at?: string | null
          email?: string | null
          engagement_score?: number | null
          feature_adoption?: number | null
          health_score?: number | null
          id?: string
          last_interaction?: string | null
          last_login?: string | null
          ltv?: number | null
          mrr?: number | null
          name: string
          phone?: string | null
          plan?: string | null
          risk_score?: number | null
          satisfaction_score?: number | null
          segment?: string | null
          status?: string | null
          support_tickets?: number | null
          tier?: string | null
          trust?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          acquisition_channel?: string | null
          billing_status?: string | null
          cac?: number | null
          churn_probability?: number | null
          company?: string | null
          contract_end?: string | null
          contract_start?: string | null
          created_at?: string | null
          email?: string | null
          engagement_score?: number | null
          feature_adoption?: number | null
          health_score?: number | null
          id?: string
          last_interaction?: string | null
          last_login?: string | null
          ltv?: number | null
          mrr?: number | null
          name?: string
          phone?: string | null
          plan?: string | null
          risk_score?: number | null
          satisfaction_score?: number | null
          segment?: string | null
          status?: string | null
          support_tickets?: number | null
          tier?: string | null
          trust?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      contracts: {
        Row: {
          client_id: string
          contract_number: string
          created_at: string | null
          end_date: string
          id: string
          renewal_status: string | null
          services: Json | null
          start_date: string
          status: string | null
          updated_at: string | null
          user_id: string
          value: number
        }
        Insert: {
          client_id: string
          contract_number: string
          created_at?: string | null
          end_date: string
          id?: string
          renewal_status?: string | null
          services?: Json | null
          start_date: string
          status?: string | null
          updated_at?: string | null
          user_id: string
          value: number
        }
        Update: {
          client_id?: string
          contract_number?: string
          created_at?: string | null
          end_date?: string
          id?: string
          renewal_status?: string | null
          services?: Json | null
          start_date?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "contracts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      goals: {
        Row: {
          category: string
          created_at: string | null
          current_value: number | null
          deadline: string
          description: string | null
          id: string
          priority: string | null
          status: string | null
          target: number
          title: string
          unit: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string | null
          current_value?: number | null
          deadline: string
          description?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          target: number
          title: string
          unit: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string | null
          current_value?: number | null
          deadline?: string
          description?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          target?: number
          title?: string
          unit?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          ai_credits: number | null
          ai_credits_used: number | null
          company_name: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          plan_type: string | null
          stripe_customer_id: string | null
          updated_at: string | null
          user_type: string | null
        }
        Insert: {
          ai_credits?: number | null
          ai_credits_used?: number | null
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          plan_type?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          user_type?: string | null
        }
        Update: {
          ai_credits?: number | null
          ai_credits_used?: number | null
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          plan_type?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          active: boolean | null
          category: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          price: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          active?: boolean | null
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          active?: boolean | null
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
