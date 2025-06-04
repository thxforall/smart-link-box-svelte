<script lang="ts">
  import Feature from './Feature.svelte';

  const features = [
    {
      icon: '✍️',
      title: '자동 요약',
      description: 'URL 입력만으로 AI가 자동으로 내용을 요약해드립니다'
    },
    {
      icon: '🔐',
      title: '안전한 저장',
      description: 'Supabase 기반의 안전한 인증 시스템으로 보호됩니다'
    },
    {
      icon: '⚡',
      title: '빠른 성능',
      description: 'SvelteKit 기반의 빠르고 가벼운 웹앱을 경험하세요'
    }
  ];
</script>

<div class="container mx-auto px-4 py-16">
  <div class="grid md:grid-cols-3 gap-8">
    {#each features as feature}
      <Feature {...feature} />
    {/each}
  </div>
</div> 