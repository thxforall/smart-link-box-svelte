<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade, fly } from 'svelte/transition';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { onMount } from 'svelte';
  import { useAuth } from '$lib/hooks/useAuth';

  export let show = false;
  let errorMessage = '';
  let activeTab: 'login' | 'signup' = 'login';

  const { validatePassword, validateEmail, login, signup } = useAuth();

  function closeModal() {
    show = false;
    errorMessage = '';
    activeTab = 'login';
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  const handleLogin: SubmitFunction = async ({ formData, cancel }) => {
    errorMessage = '';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login(email, password);
      closeModal();
    } catch (e: any) {
      errorMessage = e.message;
      cancel();
    }
  };

  const handleSignup: SubmitFunction = async ({ formData, cancel }) => {
    errorMessage = '';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // 이메일 유효성 검사
    const emailError = validateEmail(email);
    if (emailError) {
      errorMessage = emailError;
      cancel();
      return;
    }

    // 비밀번호 유효성 검사
    const passwordError = validatePassword(password, confirmPassword);
    if (passwordError) {
      errorMessage = passwordError;
      cancel();
      return;
    }

    try {
      await signup(email, password);
      alert('이메일을 확인해주세요!');
      activeTab = 'login';
    } catch (e: any) {
      errorMessage = e.message;
      cancel();
    }
  };
</script>

{#if show}
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="-1"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
    on:click={closeModal}
    on:keydown={handleKeydown}
    transition:fade={{ duration: 200 }}
  >
    <div
      role="button"
      tabindex="0"
      class="bg-white rounded-lg p-8 w-full max-w-md"
      on:click|stopPropagation
      on:keydown={handleKeydown}
      transition:fly={{ y: -20, duration: 200 }}
    >
      <div class="flex border-b mb-6">
        <button
          class="flex-1 py-2 px-4 text-center {activeTab === 'login'
            ? 'border-b-2 border-indigo-500 text-indigo-600'
            : 'text-gray-500 hover:text-gray-700'}"
          on:click={() => (activeTab = 'login')}
        >
          로그인
        </button>
        <button
          class="flex-1 py-2 px-4 text-center {activeTab === 'signup'
            ? 'border-b-2 border-indigo-500 text-indigo-600'
            : 'text-gray-500 hover:text-gray-700'}"
          on:click={() => (activeTab = 'signup')}
        >
          회원가입
        </button>
      </div>

      {#if activeTab === 'login'}
        <form method="POST" action="?/login" use:enhance={handleLogin}>
          <div class="space-y-4">
            {#if errorMessage}
              <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {errorMessage}
              </div>
            {/if}
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">이메일</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                type="submit"
                class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                로그인
              </button>
            </div>
          </div>
        </form>
      {:else}
        <form method="POST" action="?/signup" use:enhance={handleSignup}>
          <div class="space-y-4">
            {#if errorMessage}
              <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {errorMessage}
              </div>
            {/if}
            <div>
              <label for="signup-email" class="block text-sm font-medium text-gray-700">이메일</label>
              <input
                type="email"
                name="email"
                id="signup-email"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label for="signup-password" class="block text-sm font-medium text-gray-700">비밀번호</label>
              <input
                type="password"
                name="password"
                id="signup-password"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-700">비밀번호 확인</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirm-password"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                type="submit"
                class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                회원가입
              </button>
            </div>
          </div>
        </form>
      {/if}
    </div>
  </div>
{/if} 