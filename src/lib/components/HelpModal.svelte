<script>
	import { closeModal } from 'svelte-modals';
	export let isOpen = false;
</script>

{#if isOpen}
	<div role="dialog" class="modal">
		<div class="contents">
			<h2>Color of the Day</h2>
			<div>
				<p>
					A new color every day! Put this page as your home page or on your smart screen and get
					inspired!
				</p>
				<p>
					Color names come from the "best" list of the <a
						target="_blank"
						href="https://www.npmjs.com/package/color-name-list">color&#8209;name&#8209;list</a
					> package.
				</p>
				<p>
					Favicon: <a target="_blank" href="https://icons8.com/icon/22318/rgb-color-wheel">rgb</a>
					icon by <a target="_blank" href="https://icons8.com">Icons8</a>
				</p>
			</div>
			<div class="actions">
				<button on:click={closeModal}>Awesome!</button>
			</div>
		</div>
	</div>
{/if}

<style>
	a {
		color: #6b7280;
	}
	.modal {
		overflow-wrap: normal;
		word-break: keep-all;
		font-family: 'Comfortaa', sans-serif;
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		/* allow click-through to backdrop */
		pointer-events: none;
	}

	.contents {
		max-width: 340px;
		border-radius: 6px;
		padding: 24px;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		pointer-events: auto;
	}

	h2 {
		text-align: center;
		font-size: 24px;
	}

	p {
		text-align: center;
		margin-top: 16px;
	}

	.actions {
		margin-top: 32px;
		display: flex;
		justify-content: center;
	}
</style>
