<script lang="ts">
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';
  import { supabase } from '$lib/supabaseClient';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { onMount } from 'svelte';

  export let show = false;
  let errorMessage = '';

  function closeModal() {
    show = false;
    errorMessage = '';
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

  const handleSubmit: SubmitFunction = async ({ formData, cancel }) => {
    errorMessage = '';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      errorMessage = error.message;
      cancel();
      return;
    }

    await invalidateAll();
    closeModal();
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
    on:keyup|preventDefault={closeModal}
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
      <h2 id="modal-title" class="text-2xl font-bold mb-6">로그인</h2>
      <form method="POST" action="?/login" use:enhance={handleSubmit}>
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
    </div>
  </div>
{/if} 