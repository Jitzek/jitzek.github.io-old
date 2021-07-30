<script lang="ts">
	export let width: string = '3rem';
	export let height: string = '100%';
</script>

<button class="window-close-button" style="width: {width}; height: {height};" on:click>
	<svg
		height="100%"
		viewBox="0 0 365.696 365.696"
		width="auto"
		xmlns="http://www.w3.org/2000/svg"
        fill="white"
		><path
			d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"
		/></svg
	>
</button>

<style lang="scss">
	.window-close-button {
		background-color: transparent;

		outline: none;
		border: none;

		color: inherit;
		font-family: inherit;
		font-size: inherit;

		display: flex;
		align-items: center;
		justify-content: center;

        transition: background-color 0.15s;

        cursor: pointer;

		svg {
			height: 0.85rem;
            transition: height 0.15s;
            fill: var(--font-color);
		}
	}

	.window-close-button:hover {
		background-color: var(--accent-alert-color);
        svg {
            height: 1rem;
        }
	}
</style>
