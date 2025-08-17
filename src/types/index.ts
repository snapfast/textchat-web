export interface User {
  id: number;
  username: string;
  full_name: string;
  bio?: string;
  auth_provider: string;
  created_at: string;
  updated_at: string;
  email?: string;
  last_active_at?: string;
  is_online?: boolean;
}

export interface Chat {
  id: string;
  type: string;
  name?: string;
  created_at: string;
  updated_at: string;
  last_message?: Message;
  participants: User[];
  unread_count?: number;
}

export interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  message_type: "text" | "image" | "file";
  file_url?: string;
  file_name?: string;
  file_size?: number;
  created_at: string;
  updated_at?: string;
  edited: boolean;
  sender?: User;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  full_name: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user?: User;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  has_more: boolean;
  next_cursor?: string;
}
