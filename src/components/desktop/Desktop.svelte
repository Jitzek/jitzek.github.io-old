<script lang="ts">
	import Wallpaper from '$components/shared/Wallpaper.svelte';
	import Taskbar from '$components/desktop/taskbar/Taskbar.svelte';
	import Grid from '$components/shared/grid/Grid.svelte';
	import Window from '$desktop/window/Window.svelte';
	import { convertRemToPixels } from '$components/shared/conversions';
	import { programsStore, addProgram, removeProgram, getProgramById } from '$stores/shared/ProgramsStore';
	import { processesStore, removeProcessById, maxWindowZIndex, maxWindowZIndexStore } from '$stores/shared/ProcessesStore';
	import { Program as ProgramObject } from '$shared/program/Program';
	import { Window as WindowObject } from '$shared/program/Window';
	import type { Process as ProcessObject } from '$components/shared/program/Process';
	import { Category as CategoryObject } from '$components/shared/program/Category';
	import { categoriesStore, getCategoryByName } from '$stores/shared/CategoriesStore';

	let wallpaper: string = '/images/wallpapers/custom-design-01-1280x720.png';

	let taskbarHeight: number;

	addProgram(
		new ProgramObject(
			'Z Terminal 1',
			'This is a terminal',
			getCategoryByName(CategoryObject.Name.CATEGORY_1),
			'/images/icons/utilities-terminal.svg',
			new WindowObject(WindowObject.ContentType.URL, 'Test 1', 400, 200)
		)
	);
	addProgram(
		new ProgramObject(
			'A Terminal 1',
			'This is a terminal',
			getCategoryByName(CategoryObject.Name.CATEGORY_1),
			'/images/icons/utilities-terminal.svg',
			new WindowObject(WindowObject.ContentType.URL, 'Test 1', 400, 200)
		)
	);
	addProgram(
		new ProgramObject(
			'G Terminal 1',
			'This is a terminal',
			getCategoryByName(CategoryObject.Name.CATEGORY_1),
			'/images/icons/utilities-terminal.svg',
			new WindowObject(WindowObject.ContentType.URL, 'Test 1', 400, 200)
		)
	);
	addProgram(
		new ProgramObject(
			'Terminal 2',
			'This is also a terminal',
			getCategoryByName(CategoryObject.Name.CATEGORY_2),
			'/images/icons/utilities-terminal.svg',
			new WindowObject(WindowObject.ContentType.URL, 'Test 2', 500, 500)
		)
	);

	function updateWindows(): void {
		$processesStore = $processesStore;
	}

	function getWindows(): Array<WindowObject> {
		return $processesStore.flatMap((process) => process.window).filter((window) => window !== null);
	}

	function getProcessById(id: number): ProcessObject {
		return $processesStore.find((process) => process.id === id);
	}

	function handleWindowSelection(processId: number) {
		let process = getProcessById(processId);
		let selectedWindow = process.window;
		if (!selectedWindow) return;
		getWindows().forEach((window) => {
			if (window.z_index > selectedWindow.z_index) {
				window.z_index -= 1;
			}
		});

		console.log(maxWindowZIndex);
		selectedWindow.z_index = maxWindowZIndex;
	    // Save current x, y, width and height to program
		// TODO: ONLY change x, y, width and height if this proves to be troublesome
		getProgramById(process.getProgramId()).window = process.window;

		updateWindows();
	}
	function handleWindowMinimize(id: number) {}
	function handleWindowClose(id: number) {
		removeProcessById(id);
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
				bind:height={window.height}
				bind:width={window.width}
				bind:x={window.x}
				bind:y={window.y}
				bind:fullscreen={window.fullscreen}
				bind:minimized={window.minimized}
				bind:z_index={window.z_index}
				onSelection={() => handleWindowSelection(id)}
				onMinimize={() => handleWindowMinimize(id)}
				onClose={() => handleWindowClose(id)}
			/>
		{/if}
	{/each}
</div>

<Taskbar bind:height={taskbarHeight} z_index={$maxWindowZIndexStore + 1} />

<style lang="scss">
	.grid-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
