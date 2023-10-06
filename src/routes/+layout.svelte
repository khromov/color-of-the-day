<script>
	import '$lib/css/reset.css';
	import '@fontsource/comfortaa/400.css';
	import '@fontsource/comfortaa/700.css';
	import { Modals, closeModal } from 'svelte-modals';
</script>

<svelte:head>
	<title>Color of the Day - Daily color inspiration</title>
</svelte:head>

<Modals>
	<div slot="backdrop" class="backdrop" on:click={closeModal} />
</Modals>

<slot />

<style>
	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
