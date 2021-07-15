<script lang="ts">
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
	<button class="launcher" style="grid-row: {row}; height: {height}">
		<img src={icon} {alt} width="100%" height="auto" />
	</button>
{/if}

<style lang="scss">
	.launcher {
		background-color: rgba(0, 0, 0, 0);
		transition: background-color 0.2s;
		outline: none;
		border: none;
		
		cursor: pointer;
	}

	.launcher:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}
</style>
