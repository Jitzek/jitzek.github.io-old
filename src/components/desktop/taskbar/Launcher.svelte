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
	<div class="launcher" style="grid-row: {row}; height: {height}">
		<img src={icon} {alt} width="100%" height="auto" />
	</div>
{/if}

<style lang="scss">
</style>
