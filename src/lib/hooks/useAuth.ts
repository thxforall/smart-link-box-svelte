import { supabase } from '$lib/supabaseClient';
import { invalidateAll } from '$app/navigation';

export function useAuth() {
  const validatePassword = (password: string, confirmPassword: string): string | null => {
    if (password.length < 6) {
      return '비밀번호는 6자 이상이어야 합니다.';
    }

    if (password !== confirmPassword) {
      return '비밀번호가 일치하지 않습니다.';
    }

    return null;
  };

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return '유효한 이메일 주소를 입력해주세요.';
    }
    return null;
  };

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw new Error(error.message);
    }

    await invalidateAll();
  };

  const signup = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        throw new Error('이미 등록된 이메일 주소입니다.');
      }
      throw new Error(error.message);
    }

    // 이메일 인증이 필요하지 않은 경우 자동 로그인
    if (data?.user && !data.user.email_confirmed_at) {
      await login(email, password);
    }
  };

  return {
    validatePassword,
    validateEmail,
    login,
    signup
  };
} 