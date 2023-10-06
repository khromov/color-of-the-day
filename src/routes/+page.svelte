<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Cron } from 'croner';
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	export let data;

	let cron: Cron | undefined;

	let initialFadeInTimer: ReturnType<typeof setTimeout> | undefined;
	let show = false;

	onMount(() => {
		cron = new Cron('0 * * * * *', async () => {
			console.log(new Date().toLocaleTimeString(), 'Reloading color');
			await invalidateAll();
		});
	});

	initialFadeInTimer = setTimeout(() => {
		show = true;
	}, 750);

	onDestroy(() => {
		if (cron?.isRunning()) {
			cron.stop();
		}

		if (initialFadeInTimer) {
			clearTimeout(initialFadeInTimer);
		}
	});
</script>

<main style="--daily-color: {data.color.hex};" class:lightColor={data.lightColor}>
	{#if show}
		<section class="frame" in:fade>
			<section class="content">
				<section class="date">
					<h2 class="date">
						{data.date}
					</h2>
				</section>

				<section class="meta">
					<h3>{data.color.hex}</h3>
					<h1>{data.color.name}</h1>
				</section>
			</section>
		</section>
	{/if}
</main>

<style>
	main {
		background-color: var(--daily-color);
		height: 100vh;
		width: 100vw;
	}

	main {
		color: white;
	}

	main.lightColor {
		color: black;
	}

	section.frame {
		width: 100vw;
		height: 100vh;
		padding: 2.7vw;
	}

	section.content {
		border: 1vw solid white;
		width: 100%;
		height: 100%;
		padding: 1.5vw 1.7vw;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	section.meta {
		font-family: 'Comfortaa', sans-serif;
		margin-top: auto; /* Push to the bottom */
		align-self: flex-end; /* Align to the right */
		text-align: right;
	}

	section.meta h3 {
		font-size: 2.5vw;
		font-weight: 400;
		margin: 0;
	}

	section.meta h1 {
		font-size: 4.5vw;
		font-weight: 700;
		margin: 0;
	}

	main.lightColor section.content {
		border-color: black;
	}

	h2.date {
		font-family: 'Comfortaa', sans-serif;
		font-size: 3vw;
	}
</style>
