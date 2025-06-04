<!-- Login page -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';

  let email = '';
  let password = '';
  let loading = false;
  let error: string | null = null;

  async function handleLogin() {
    try {
      loading = true;
      error = null;
      const { error: err } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (err) throw err;
      goto('/dashboard');
    } catch (e: any) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  async function handleSignUp() {
    try {
      loading = true;
      error = null;
      const { error: err } = await supabase.auth.signUp({
        email,
        password
      });
      if (err) throw err;
      alert('이메일을 확인해주세요!');
    } catch (e: any) {
      error = e.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        SmartLinkBox
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        AI 기반 북마크 관리 서비스
      </p>
    </div>
    <form class="mt-8 space-y-6" on:submit|preventDefault={handleLogin}>
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email" class="sr-only">이메일</label>
          <input
            id="email"
            name="email"
            type="email"
            bind:value={email}
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="이메일"
          />
        </div>
        <div>
          <label for="password" class="sr-only">비밀번호</label>
          <input
            id="password"
            name="password"
            type="password"
            bind:value={password}
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="비밀번호"
          />
        </div>
      </div>

      {#if error}
        <div class="text-red-500 text-sm text-center">{error}</div>
      {/if}

      <div class="flex flex-col space-y-4">
        <button
          type="submit"
          disabled={loading}
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? '처리중...' : '로그인'}
        </button>
        <button
          type="button"
          on:click={handleSignUp}
          disabled={loading}
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          회원가입
        </button>
      </div>
    </form>
  </div>
</div> 