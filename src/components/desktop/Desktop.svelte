<script lang="ts">
	import Wallpaper from '$components/shared/Wallpaper.svelte';
	import Taskbar from '$components/desktop/taskbar/Taskbar.svelte';
	import Grid from '$components/shared/grid/Grid.svelte';
	import Window from '$desktop/window/Window.svelte';
	import { convertRemToPixels } from '$components/shared/conversions';

	let wallpaper: string = '/images/wallpapers/custom-design-01-1280x720.png';

	let taskbarHeight: number;

	let maxWindowZIndex: number = 0;
	let windows: Array<{
		id: number,
		height: number;
		width: number;
		x: number;
		y: number;
		fullscreen: boolean;
		minimized: boolean;
		z_index: number;
	}> = [];

	let temp = 50;
	let c_window_id = 0;
	function addWindow() {
		maxWindowZIndex += 1;
		/*
			Use a key (like ID) to let svelte know which component to remove (else it will default to the last one)
			https://github.com/sveltejs/svelte/issues/3035
			https://svelte.dev/docs#each
		*/
		windows.push({
			id: c_window_id++,
			height: 500,
			width: 600,
			x: (temp += 50),
			y: (temp += 50),
			fullscreen: false,
			minimized: false,
			z_index: maxWindowZIndex
		});

		windows = windows;
	}

	function closeWindow(index: number) {
		let z_indexOfRemovedWindow = windows[index].z_index;
		windows.splice(index, 1);

		maxWindowZIndex -= 1;
		windows.forEach((window) => {
			if (window.z_index > z_indexOfRemovedWindow) {
				window.z_index -= 1;
			}
		});

		windows = windows;
	}

	function handleWindowSelection(index: number) {
		let selectedWindow = windows[index];
		if (!selectedWindow) return;
		windows.forEach((window) => {
			if (window.z_index > selectedWindow.z_index) {
				window.z_index -= 1;
			}
		});

		selectedWindow.z_index = maxWindowZIndex;
		windows = windows;
	}
	function handleWindowMinimize(index: number) {

	}
	function handleWindowClose(index: number) {
		closeWindow(index);
	}

	addWindow();
	addWindow();
	addWindow();
	addWindow();
	addWindow();
</script>

<!-- <Wallpaper src={wallpaper} /> -->
<div class="grid-container">
	<Grid heightOffset={taskbarHeight} columnWidth={5} columnHeight={6} gap={1.5} padding={1} />
</div>
<div class="windows-container">
	{#each windows as { id, height, width, x, y, fullscreen, minimized, z_index }, index (id)}
		<Window
			heightOffset={convertRemToPixels(taskbarHeight)}
			initialHeight={height}
			initialWidth={width}
			initialX={x}
			initialY={y}
			initialFullscreen={fullscreen}
			initialMinimized={minimized}
			z_index={z_index}
			onSelection={() => handleWindowSelection(index)}
			onMinimize={() => handleWindowMinimize(index)}
			onClose={() => handleWindowClose(index)}
		/>
	{/each}
</div>
<!-- <Window heightOffset={convertRemToPixels(taskbarHeight)} height={500} width={600} x={250} y={200} fullscreen={false} /> -->

<Taskbar bind:height={taskbarHeight} z_index={maxWindowZIndex + 1} />

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
