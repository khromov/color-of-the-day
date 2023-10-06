<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Cron } from 'croner';
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import FaInfoCircle from 'svelte-icons/fa/FaInfoCircle.svelte';

	import { openModal } from 'svelte-modals';
	import Modal from '$lib/components/HelpModal.svelte';
	import focused from '$lib/actions/focused';

	export let data;

	let cron: Cron | undefined;

	let initialFadeInTimer: ReturnType<typeof setTimeout> | undefined;
	let show = false;

	onMount(() => {
		cron = new Cron('0 0 * * * *', async () => {
			console.log(new Date().toLocaleTimeString(), 'Reloading color');
			try {
				await invalidateAll();
			} catch (e) {
				console.error(e);
			}
		});
	});

	initialFadeInTimer = setTimeout(() => {
		show = true;
	}, 500);

	onDestroy(() => {
		if (cron?.isRunning()) {
			cron.stop();
		}

		if (initialFadeInTimer) {
			clearTimeout(initialFadeInTimer);
		}
	});

	const onOpenModal = () => {
		openModal(Modal);
	};

	const onFocused = async () => {
		console.log('Focused, reloading color!');
		try {
			await invalidateAll();
		} catch (e) {
			console.error(e);
		}
	};
</script>

<main
	use:focused={onFocused}
	style="--daily-color: {data.color.hex};"
	class:lightColor={data.lightColor}
>
	{#if show}
		<section class="frame" in:fade>
			<section class="content">
				<section class="date-container">
					<h2 class="date">
						{data.date}
					</h2>
					<div class="info">
						<div
							class="icon"
							on:click={onOpenModal}
							on:keypress={onOpenModal}
							role="button"
							tabindex="0"
						>
							<FaInfoCircle />
						</div>
					</div>
				</section>

				<section class="meta-container">
					<h3>{data.color.hex}</h3>
					{#if data.color?.pantone}
						<h2>{data.color?.pantone}</h2>
					{/if}
					<h1>{data.color.name}</h1>
				</section>
			</section>
		</section>
	{/if}
</main>

<style>
	main {
		background-color: var(--daily-color);
		height: 100dvh;
		width: 100dvw;
	}

	main {
		color: white;
	}

	main.lightColor {
		color: black;
	}

	section.frame {
		width: 100dvw;
		height: 100dvh;
		padding: 2.7vw;
	}

	section.content {
		border: 1vw solid white;
		width: 100%;
		height: 100%;
		padding: 1.8vw 2.6vw;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	section.meta-container {
		font-family: 'Comfortaa', sans-serif;
		margin-top: auto;
		align-self: flex-end;
		text-align: right;
	}

	section.meta-container h3 {
		font-size: 2.5vw;
		font-weight: 400;
		margin: 0;
	}

	section.meta-container h2 {
		font-size: 4vw;
		font-weight: 700;
		margin: 0;
	}

	section.meta-container h1 {
		font-size: 4.5vw;
		font-weight: 700;
		margin: 0;
	}

	main.lightColor section.content {
		border-color: black;
	}

	section.date-container {
		display: flex;
		justify-content: space-between;
	}

	h2.date {
		font-family: 'Comfortaa', sans-serif;
		font-size: 3vw;
	}

	.icon {
		cursor: pointer;
		width: 3vw;
		height: 3vw;
	}
</style>
