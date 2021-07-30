<script lang="ts">
	export let width: string = '3rem';
	export let height: string = '100%';
</script>

<button class="window-minimize-button" style="width: {width}; height: {height};" on:click>
	<svg
		version="1.1"
		id="Layer_1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 128 128"
		enable-background="new 0 0 128 128"
		xml:space="preserve"
	>
		<path
			id="XMLID_1_"
			d="M120,76H8c-4.4,0-8-3.6-8-8v-8c0-4.4,3.6-8,8-8h112c4.4,0,8,3.6,8,8v8C128,72.4,124.4,76,120,76z"
		/>
	</svg>
</button>

<style lang="scss">
	.window-minimize-button {
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

	.window-minimize-button:hover {
		background-color: var(--background-color-hover);
		svg {
			height: 1rem;
		}
	}
</style>
