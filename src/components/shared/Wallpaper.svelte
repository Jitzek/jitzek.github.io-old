<script lang="ts">
	import { onMount } from 'svelte';
	export let src: string = '/static/images/wallpapers/custom-design-01-1280x720.png';
</script>

<img src="{src}" alt="wallpaper" unselectable={true} draggable={false} />

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
