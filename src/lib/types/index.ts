export interface Link {
  id: string;
  user_id: string;
  url: string;
  title: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  created_at: string;
} 