<script lang="ts">
	import { setup as setupWindowQueries } from '$stores/DeviceTypeStore';
	import { onMount } from 'svelte';

	onMount(() => {
		// Function should be called within the onMount function since it requires window to be assigned
		setupWindowQueries({ desktopQuery: 'screen and (min-width: 768px)', listen: true });
	});
</script>

<slot />