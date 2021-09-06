<script lang="ts">
	import { desktop, mobile } from '$stores/shared/DeviceTypeStore';
	import Desktop from '$components/desktop/Desktop.svelte';
	import { onMount } from 'svelte';
	import Mobile from '$components/mobile/Mobile.svelte';

	let mounted: boolean = false;
	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	{#if $desktop}
		<Desktop />
	{:else if $mobile}
		<Mobile />
	{/if}
{:else}
	<!-- Show OS loading -->
{/if}