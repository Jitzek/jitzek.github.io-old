<script lang="ts">
	import { setup as setupWindowQueries } from '$stores/DeviceTypeStore';
	import { onMount } from 'svelte';

	onMount(() => {
		// Function should be called within the onMount function since it requires window to be assigned
		setupWindowQueries({ desktopQuery: 'screen and (min-width: 768px)', listen: true });
	});
</script>

<slot />

<style lang="scss">
	:global(html) :global(body) {
		background-color: #4d555b;
		margin: 0;
		height: 100%;

		-moz-user-select: none;
		-webkit-user-select: none;
		user-select: none;

		user-drag: none;
		-webkit-user-drag: none;
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}
	
</style>
