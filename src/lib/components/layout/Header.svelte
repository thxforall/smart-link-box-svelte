<script lang="ts">
  import { user } from '$lib/stores/auth';
  import { authService } from '$lib/services/auth.service';
  import { goto } from '$app/navigation';
  import { showLoginModal } from '$lib/stores/modal';
  import Logo from '$lib/components/common/Logo.svelte';
  import Button from '$lib/components/common/Button.svelte';

  async function handleLogout() {
    await authService.signOut();
    goto('/');
  }

  function openLoginModal() {
    showLoginModal.set(true);
  }
</script>

<header class="bg-white shadow">
  <nav class="container mx-auto px-4 py-4">
    <div class="flex justify-between items-center">
      <Logo />
      
      <div class="flex items-center space-x-4">
        {#if $user}
          <span class="text-gray-600">{$user.email}</span>
          <Button variant="primary" on:click={handleLogout}>
            로그아웃
          </Button>
        {:else}
          <Button variant="primary" on:click={openLoginModal}>
            로그인
          </Button>
        {/if}
      </div>
    </div>
  </nav>
</header> 