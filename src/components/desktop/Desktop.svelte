<script lang="ts">
	import Wallpaper from '$components/shared/Wallpaper.svelte';
	import Taskbar from '$components/desktop/taskbar/Taskbar.svelte';
	import Grid from '$components/shared/grid/Grid.svelte';
	import Window from '$desktop/window/Window.svelte';
	import { convertRemToPixels } from '$components/shared/conversions';

	let wallpaper: string = '/images/wallpapers/custom-design-01-1280x720.png';

	let taskbarHeight: number;
</script>

<!-- <Wallpaper src={wallpaper} /> -->
<div class="grid-container">
	<Grid heightOffset={taskbarHeight} columnWidth={5} columnHeight={6} gap={1.5} padding={1} />
</div>
<Window heightOffset={convertRemToPixels(taskbarHeight)} height={500} width={600} x={500} fullscreen={false} />
<Taskbar bind:height={taskbarHeight} />

<style lang="scss">
	/*
    :global(html) {
		background-color: #4d555b;
		background: url('/static/images/custom-design-01-1920x1080.png') no-repeat center center fixed;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		background-size: cover;
	}
    */

	.grid-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
