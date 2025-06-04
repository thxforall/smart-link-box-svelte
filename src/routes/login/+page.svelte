<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

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
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
  <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
    <div>
      <h2 class="text-center text-3xl font-extrabold text-gray-900">
        로그인
      </h2>
    </div>
    <form class="mt-8 space-y-6" on:submit|preventDefault={handleLogin}>
      {#if error}
        <div class="text-red-500 text-sm">{error}</div>
      {/if}
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <input
            type="email"
            bind:value={email}
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="이메일 주소"
          />
        </div>
        <div>
          <input
            type="password"
            bind:value={password}
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="비밀번호"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </div>
    </form>
  </div>
</div> 