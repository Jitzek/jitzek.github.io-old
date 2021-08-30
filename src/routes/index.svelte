<script lang="ts">
	import { desktop, mobile } from '$stores/shared/DeviceTypeStore';
	import Desktop from '$components/desktop/Desktop.svelte';
	import { onMount } from 'svelte';

	let mounted: boolean = false;
	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	{#if $desktop}
		<Desktop />
	{:else if $mobile}
		<Desktop />
	{/if}
{:else}
    <!-- Show OS loading -->
{/if}
