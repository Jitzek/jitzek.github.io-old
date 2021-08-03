<script lang="ts">
	import Wallpaper from '$components/shared/Wallpaper.svelte';
	import Taskbar from '$components/desktop/taskbar/Taskbar.svelte';
	import Grid from '$components/shared/grid/Grid.svelte';
	import Window from '$desktop/window/Window.svelte';
	import { convertRemToPixels } from '$components/shared/conversions';
	import { programsStore } from '$stores/shared/ProgramsStore';
	import { processesStore } from '$stores/shared/ProcessesStore';
	import { Program as ProgramObject } from '$shared/program/Program';
	import { Window as WindowObject } from '$shared/program/Window';
	import { Process } from '$components/shared/program/Process';

	let wallpaper: string = '/images/wallpapers/custom-design-01-1280x720.png';

	let taskbarHeight: number;

	addProgram(
		new ProgramObject(
			'Terminal 1',
			'This is a terminal',
			ProgramObject.Category.CATEGORY1,
			'/images/icons/utilities-terminal.svg',
			new WindowObject(WindowObject.ContentType.URL, 'Test 1', 400, 200, 0, 0)
		)
	);
	addProgram(
		new ProgramObject(
			'Terminal 2',
			'This is also a terminal',
			ProgramObject.Category.CATEGORY1,
			'/images/icons/utilities-terminal.svg',
			new WindowObject(WindowObject.ContentType.URL, 'Test 2', 500, 500, 0, 0)
		)
	);

	function updateWindows(): void {
		$processesStore = $processesStore;
	}

	function getWindows(): Array<WindowObject> {
		return $processesStore.flatMap(process => process.window);
	}

	function getProcessById(id: number): Process {
		return $processesStore.find(process => process.id === id);
	}

	function closeWindow(id: number) {
		let z_indexOfRemovedWindow = getProcessById(id).window.z_index;
		getWindows().forEach((window) => {
			if (window.z_index > z_indexOfRemovedWindow) {
				window.z_index -= 1;
			}
		});
	}

	function closeProcess(id: number) {
		closeWindow(id);
		processesStore.update(processes => {
			return processes.filter(process => process.id !== id);
		});
		updateWindows();
	}

	function handleWindowSelection(id: number) {
		let selectedWindow = getProcessById(id).window;
		if (!selectedWindow) return;
		getWindows().forEach((window) => {
			if (window.z_index > selectedWindow.z_index) {
				window.z_index -= 1;
			}
		});

		selectedWindow.z_index = WindowObject.maxZIndex;
		updateWindows();
	}
	function handleWindowMinimize(index: number) {}
	function handleWindowClose(id: number) {
		closeProcess(id);
	}

	let processes: Array<Process> = [];
	programsStore.subscribe((programs) => {});

	function addProgram(program: ProgramObject) {
		// temp
		// program.createProcess();
		//
		programsStore.update((programs) => {
			programs.push(program);
			return programs;
		});
	}
</script>

<!-- <Wallpaper src={wallpaper} /> -->
<div class="grid-container">
	<Grid heightOffset={taskbarHeight} columnWidth={5} columnHeight={6} gap={1.5} padding={1} />
</div>
<div class="windows-container">
	<!-- 
		Keyed each block :
		https://svelte.dev/tutorial/keyed-each-blocks
	 -->
	<!-- {#each windows as { id, height, width, x, y, fullscreen, minimized, z_index }, index (id)}
		<Window
			heightOffset={convertRemToPixels(taskbarHeight)}
			initialHeight={height}
			initialWidth={width}
			initialX={x}
			initialY={y}
			initialFullscreen={fullscreen}
			initialMinimized={minimized}
			{z_index}
			onSelection={() => handleWindowSelection(index)}
			onMinimize={() => handleWindowMinimize(index)}
			onClose={() => handleWindowClose(index, id)}
		/>
	{/each} -->
	{#each $processesStore as { id, window } (id)}
		<Window
			heightOffset={convertRemToPixels(taskbarHeight)}
			initialHeight={window.height}
			initialWidth={window.width}
			initialX={window.x}
			initialY={window.y}
			initialFullscreen={window.fullscreen}
			initialMinimized={window.minimized}
			z_index={window.z_index}
			onSelection={() => handleWindowSelection(id)}
			onMinimize={() => handleWindowMinimize(id)}
			onClose={() => handleWindowClose(id)}
		/>
	{/each}
</div>
<!-- <Window heightOffset={convertRemToPixels(taskbarHeight)} height={500} width={600} x={250} y={200} fullscreen={false} /> -->

<Taskbar bind:height={taskbarHeight} z_index={Process.maxZIndex + 1} />

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
