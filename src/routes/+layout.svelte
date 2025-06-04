<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import LoginModal from '$lib/components/LoginModal.svelte';
	import { showLoginModal } from '$lib/stores/modal';
</script>

<svelte:head>
	<link rel="stylesheet" href="/app.css" />
</svelte:head>

<Header />

<main class="container mx-auto px-4 py-8">
	<slot />
</main>

<LoginModal bind:show={$showLoginModal} />
