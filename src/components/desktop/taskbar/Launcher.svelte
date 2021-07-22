<script lang="ts">
	import Tooltip from '../Tooltip.svelte';

	export let name: string;
	export let icon: string;
	export let alt: string = 'launcher';
	export let row: number;
	export let height: string;

	// Workaround
	export let ghost: boolean = false;
</script>

{#if ghost}
	<div style="grid-row: {row}; height: {height}"><div style="padding-top: 100%;" /></div>
{:else}
	<div style="grid-row: {row};">
		<Tooltip tooltip={name} position="top">
			<button class="launcher" style="height: {height}">
				<img src={icon} {alt} width="100%" height="auto" />
			</button>
		</Tooltip>
	</div>
{/if}

<style lang="scss">
	.launcher {
		background-color: rgba(0, 0, 0, 0);
		transition: background-color 0.25s;
		outline: none;
		border: none;

		cursor: pointer;

		img {
			width: 90%;
			transition: width 0.25s;
		}
	}

	.launcher:hover {
		background-color: var(--background-color-secondary-hover);

		img {
			width: 100%;	
		}
	}
</style>
