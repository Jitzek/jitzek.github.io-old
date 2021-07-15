<script lang="ts">
	export let icon: string;
	export let alt: string = 'launcher';
	export let row: number;

	// Workaround
	export let ghost: boolean = false;
</script>

{#if ghost}
	<div style="grid-row: {row};"><div style="padding-top: 100%;" /></div>
{:else}
	<div class="launcher" style="grid-row: {row};">
		<img src={icon} {alt} width="100%" height="auto" />
	</div>
{/if}

<style lang="scss">
</style>
