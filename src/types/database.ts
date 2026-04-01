export type LockerSize = "SMALL" | "LARGE";
export type LockerStatus = "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";
export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "REFUNDED" | "FAILED";
export type UserRole = "USER" | "ADMIN";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          phone: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          phone?: string | null;
          role?: UserRole;
        };
        Update: {
          email?: string;
          name?: string | null;
          phone?: string | null;
          role?: UserRole;
        };
        Relationships: [];
      };
      trailers: {
        Row: {
          id: string;
          name: string;
          address: string;
          latitude: number;
          longitude: number;
          active: boolean;
          opening_time: string;
          closing_time: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          address: string;
          latitude: number;
          longitude: number;
          active?: boolean;
          opening_time?: string;
          closing_time?: string;
        };
        Update: {
          name?: string;
          address?: string;
          latitude?: number;
          longitude?: number;
          active?: boolean;
          opening_time?: string;
          closing_time?: string;
        };
        Relationships: [];
      };
      lockers: {
        Row: {
          id: string;
          trailer_id: string;
          label: string;
          size: LockerSize;
          status: LockerStatus;
          width_cm: number;
          height_cm: number;
          depth_cm: number;
          price_per_hour: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          trailer_id: string;
          label: string;
          size: LockerSize;
          status?: LockerStatus;
          width_cm: number;
          height_cm: number;
          depth_cm: number;
          price_per_hour: number;
        };
        Update: {
          label?: string;
          size?: LockerSize;
          status?: LockerStatus;
          width_cm?: number;
          height_cm?: number;
          depth_cm?: number;
          price_per_hour?: number;
        };
        Relationships: [
          {
            foreignKeyName: "lockers_trailer_id_fkey";
            columns: ["trailer_id"];
            isOneToOne: false;
            referencedRelation: "trailers";
            referencedColumns: ["id"];
          },
        ];
      };
      bookings: {
        Row: {
          id: string;
          locker_id: string;
          user_id: string;
          start_time: string;
          end_time: string;
          status: BookingStatus;
          qr_code: string;
          total_price: number;
          payment_status: PaymentStatus;
          stripe_session_id: string | null;
          stripe_payment_intent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          locker_id: string;
          user_id: string;
          start_time: string;
          end_time: string;
          status?: BookingStatus;
          qr_code: string;
          total_price: number;
          payment_status?: PaymentStatus;
          stripe_session_id?: string | null;
          stripe_payment_intent_id?: string | null;
        };
        Update: {
          status?: BookingStatus;
          end_time?: string;
          total_price?: number;
          payment_status?: PaymentStatus;
          stripe_session_id?: string | null;
          stripe_payment_intent_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bookings_locker_id_fkey";
            columns: ["locker_id"];
            isOneToOne: false;
            referencedRelation: "lockers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      locker_size: LockerSize;
      locker_status: LockerStatus;
      booking_status: BookingStatus;
      payment_status: PaymentStatus;
      user_role: UserRole;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
