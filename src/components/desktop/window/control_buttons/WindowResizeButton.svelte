<script lang="ts">
	export let width: string = '3rem';
	export let height: string = '100%';

	export let isFullscreen: boolean;
</script>

<button class="window-resize-button" style="width: {width}; height: {height};" on:click>
	{#if isFullscreen}
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
				stroke-width="18"
				stroke-miterlimit="10"
				d="M81.5,122H18c-6.6,0-12-5.4-12-12
   V46.5c0-6.6,5.4-12,12-12h63.5c6.6,0,12,5.4,12,12V110C93.5,116.6,88.1,122,81.5,122z"
			/>
			<path
				id="XMLID_2_"
				stroke-width="18"
				stroke-miterlimit="10"
				d="M94,97c-0.2-7.3-0.5-18.6-0.5-32.5
   c0-18.4,0.5-23.2-3.3-27c-4.7-4.8-11.2-3.1-34.3-2.8c-10.7,0.2-19.5,0-25.5-0.3c-2-10.2,0.8-19.9,7.5-25c1.6-1.2,4.3-2.8,8.5-3.5
   H110c6.6,0,12,5.4,12,12v63.5c-0.4,2.6-1.4,5.7-3.5,8.5C113.5,96.5,103.9,99.1,94,97z"
			/>
		</svg>
	{:else}
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
				stroke-width="18"
				stroke-miterlimit="10"
				d="M102,114H26c-6.6,0-12-5.4-12-12V26
   c0-6.6,5.4-12,12-12h76c6.6,0,12,5.4,12,12v76C114,108.6,108.6,114,102,114z"
			/>
		</svg>
	{/if}
</button>

<style lang="scss">
	.window-resize-button {
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
			stroke: var(--font-color);
			fill: none;
		}
	}

	.window-resize-button:hover {
		background-color: var(--background-color-hover);
		svg {
			height: 1rem;
		}
	}
</style>
