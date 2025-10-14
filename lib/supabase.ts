import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SixMonthCourse {
  id: string;
  name: string;
  description: string;
  fee: number;
  duration: string;
  created_at: string;
}

export interface SixWeekCourse {
  id: string;
  name: string;
  description: string;
  fee: number;
  duration: string;
  created_at: string;
}

export interface ContactInquiry {
  name: string;
  phone: string;
  email: string;
  selected_courses: Array<{ id: string; name: string; fee: number; type: string }>;
  total_amount: number;
}
