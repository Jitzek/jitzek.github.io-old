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
	import type { Process as ProcessObject } from '$components/shared/program/Process';

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
		return $processesStore.flatMap((process) => process.window).filter(window => window !== null);
	}

	function getProcessById(id: number): ProcessObject {
		return $processesStore.find((process) => process.id === id);
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
		processesStore.update((processes) => {
			return processes.filter((process) => process.id !== id);
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

	function addProgram(program: ProgramObject) {
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
	{#each $processesStore as { id, window } (id)}
		{#if window !== null}
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
		{/if}
	{/each}
</div>

<Taskbar bind:height={taskbarHeight} z_index={WindowObject.maxZIndex + 1} />

<style lang="scss">
	.grid-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
