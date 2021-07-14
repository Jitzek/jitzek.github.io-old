<script lang="ts">
	import { setup as setupWindowQueries } from '$stores/DeviceTypeStore';
	import { onMount } from 'svelte';

	onMount(() => {
		setupWindowQueries({ desktopQuery: 'screen and (min-width: 768px)' });
	});
</script>

<slot />
