<script lang="ts">
	import Wallpaper from '$components/shared/Wallpaper.svelte';
	import Taskbar from '$components/desktop/taskbar/Taskbar.svelte';
	import Grid from '$components/shared/grid/Grid.svelte';
	import Window from '$components/desktop/window/Window.svelte';

	import { convertRemToPixels } from '$objects/shared/conversions';
	import type { Window as WindowObject } from '$objects/shared/program/Window';
	import type { Process as ProcessObject } from '$objects/shared/program/Process';

	import { getProgramById } from '$stores/shared/ProgramsStore';
	import {
		processesStore,
		removeProcessById,
		maxWindowZIndex,
		maxWindowZIndexStore
	} from '$stores/shared/ProcessesStore';
	import { contextMenuStore } from '$stores/desktop/ContextMenuStore';
	import ContextMenu from './context_menu/ContextMenu.svelte';
	import ContextMenuOption from './context_menu/ContextMenuOption.svelte';
import { hideMenu } from '$stores/desktop/MenuStore';

	let wallpaper: string = '/images/wallpapers/custom-design-01-1280x720.png';

	let taskbarHeight: number;

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
		hideMenu();
		let process = getProcessById(processId);
		if (!process) return;
		let selectedWindow = process.window;
		if (!selectedWindow) return;
		getWindows().forEach((window) => {
			if (window.z_index > selectedWindow.z_index) {
				window.z_index -= 1;
			}
		});

		selectedWindow.z_index = maxWindowZIndex;
		// Save current x, y, width and height to program
		let window = getProgramById(process.getProgramId()).window;
		window.x = process.window.x;
		window.y = process.window.y;
		window.width = process.window.width;
		window.height = process.window.height;
		window.fullscreen = process.window.fullscreen;

		updateWindows();
	}
	function handleWindowMinimize(id: number) {}
	function handleWindowClose(id: number) {
		removeProcessById(id);
	}
</script>

<svelte:head>
	<title>Jitze Jan Kerkstra</title>
</svelte:head>

<!-- <Wallpaper src={wallpaper} /> -->
<div class="grid-container">
	<Grid heightOffset={taskbarHeight} columnWidth={5} columnHeight={6} gap={1.5} padding={1} />
</div>
<div class="windows-container">
	<!-- 
		Keyed each block :
		https://svelte.dev/tutorial/keyed-each-blocks
	 -->
	{#each $processesStore as { id, name, icon, window } (id)}
		{#if window !== null}
			<Window
				bind:height={window.height}
				bind:width={window.width}
				bind:x={window.x}
				bind:y={window.y}
				bind:fullscreen={window.fullscreen}
				bind:minimized={window.minimized}
				bind:z_index={window.z_index}
				title={name}
				{icon}
				heightOffset={convertRemToPixels(taskbarHeight)}
				onSelection={() => handleWindowSelection(id)}
				onMinimize={() => handleWindowMinimize(id)}
				onClose={() => handleWindowClose(id)}
			>
				<svelte:component
					this={window.component}
					{...window.componentAttributes}
					slot="content"
					onSelection={() => handleWindowSelection(id)}
				/>
			</Window>
		{/if}
	{/each}
</div>

<Taskbar bind:height={taskbarHeight} z_index={$maxWindowZIndexStore + 1} />

{#if $contextMenuStore.show}
	<ContextMenu x={$contextMenuStore.x} y={$contextMenuStore.y} z_index={$maxWindowZIndexStore + 2}>
		<div slot="options">
			{#each $contextMenuStore.options as option}
				<ContextMenuOption name={option.name} icon={option.icon} onClick={option.onClick} />
			{/each}
		</div>
	</ContextMenu>
{/if}

<style lang="scss">
	.grid-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
