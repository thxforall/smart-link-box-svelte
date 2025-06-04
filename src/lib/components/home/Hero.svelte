<script lang="ts">
  import { showLoginModal } from '$lib/stores/modal';
  import Button from '$lib/components/common/Button.svelte';

  function handleStart() {
    showLoginModal.set(true);
  }
</script>

<div class="container mx-auto px-4 py-16">
  <div class="text-center">
    <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
      SmartLinkBox
    </h1>
    <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      AI가 자동으로 요약하고 분류해주는 스마트한 북마크 관리 서비스
    </p>
    <Button
      variant="primary"
      class_name="px-8 py-3 text-lg font-semibold"
      on:click={handleStart}
    >
      시작하기
    </Button>
  </div>
</div> 