<script lang="ts">
import { onMount } from "svelte";


	export let src: string = '/static/images/custom-design-01-1280x720.png';

	onMount(() => {
		// Disable image dragging
		// This could have potential unwanted side effects
		document.body.ondragstart = () => { return false; }
	});
</script>

<img {src} alt="wallpaper" unselectable="{true}" draggable="{false}" />

<style lang="scss">
	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: fixed;

		// pointer-events: none;
	}
</style>
