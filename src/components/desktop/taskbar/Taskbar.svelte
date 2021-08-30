<script lang="ts">
	/** IMPORTS */
	// "svelte"
	import { onMount } from 'svelte';
	//

	// "components"
	import Launcher from '$components/desktop/taskbar/Launcher.svelte';
	import MenuButton from '$components/desktop/taskbar/MenuButton.svelte';
	import Menu from '$components/desktop/taskbar/menu/Menu.svelte';
	import WhiskerMenu from '$components/shared/svg/whisker-menu.svelte';
	//

	// "objects"
	import { changeCursor, Cursor } from '$objects/desktop/cursors';
	import type { Program as ProgramObject } from '$objects/shared/program/Program';
	import { convertRemToPixels } from '$objects/shared/conversions';
	import { isStringAPositiveNumber } from '$objects/shared/typechecks';
	//

	// "stores"
	import { getProgramById } from '$stores/shared/ProgramsStore';
	import { addProgramShortcut, taskbarStore } from '$stores/desktop/TaskbarStore';
	//

	/** ENDOF IMPORTS*/

	/** EXPORTS */
	export let rows: number = 1;
	export let maxRows: number = 3;
	// Total height in REM
	export let height: number = 3.5;
	// Row height in REM
	export let rowHeight: number = 3.5;
	export let z_index: number = 9;
	/** ENDOF EXPORTS */

	/** VARIABLE DECLARATION */
	// Start of resize event (mouse down)
	let startY: number = 0;
	// The initial height at the start of the resize event (mouse down)
	let initial: number = 0;
	// true if the user is isResizing, false if not
	let isResizing: boolean = false;

	let taskbarContentElement: HTMLDivElement;

	let heightInPx = 0;

	class LauncherObject {
		program: ProgramObject | null;
		row: number;
		ghost: boolean;
	}
	let launchers: Array<LauncherObject> = [];

	const columnSize: string = `${rowHeight}rem`;

	// This should be enough, having more columns doesn't seem to affect the styling.
	let gridTemplateColumns: string = `repeat(${launchers.length}, ${columnSize})`;

	onMount(() => {
		// Set initial height in pixels
		heightInPx = convertRemToPixels(height);

		taskbarContentElement.ondragstart = () => false;
	});
	/** ENDOF VARIABLE DECLERATION */

	/** STORE CALLBACKS */
	taskbarStore.subscribe((taskbarStore) => {
		launchers = [];
		taskbarStore.programShortcuts.forEach((programShortcut) =>
			launchers.push({
				program: programShortcut.program,
				row: 1,
				ghost: false
			})
		);
		rows = rows;
	});
	/** ENDOF STORE CALLBACKS */

	/** REACTIVE VARIABLES */
	$: {
		height;
		if (height < rowHeight) height = rowHeight;
		rows = height / rowHeight;
	}

	$: {
		rows;
		if (height / rowHeight != rows) height = rows * rowHeight;
		if (rows > maxRows) {
			rows = maxRows;
			height = rows * rowHeight;
		}

		// Filter out ghost launchers
		launchers = launchers.filter((launcher) => !launcher.ghost);
		if (rows > launchers.length) {
			// Add ghost launchers to fill up whitespace
			for (let i = 0; i < rows - launchers.length; i++) {
				launchers.push({ program: null, row: 1, ghost: true });
			}
		}

		// Set the row for each launcher
		let c_row = 1;
		launchers.forEach((launcher) => {
			if (c_row > rows) c_row = 1;
			launcher.row = c_row++;
		});
		launchers = launchers;

		// Calculate the amount of columns a row needs
		// gridTemplateColumns = `repeat(${Math.round(launchers.length/rows)}, ${columnSize})`;
	}

	$: {
		launchers;
		gridTemplateColumns = `repeat(${launchers.length}, ${columnSize})`;
	}
	/** ENDOF REACTIVE VARIABLES */

	/** HELPER FUNCTIONS */
	//
	/** ENDOF HELPER FUNCTIONS */

	/** EVENT HANDLERS */
	function window_handleMouseUp() {
		// Stop isResizing
		isResizing = false;
		startY = 0;
		initial = 0;
		heightInPx = convertRemToPixels(height);

		changeCursor(Cursor.AUTO);
	}
	function window_handleMouseMove(event: MouseEvent) {
		// Only resize if the user is isResizing (mouse move)
		if (!isResizing) return;

		// Difference from start to end position (Y-axis)
		const delta = startY - event.pageY;
		heightInPx = initial + delta;

		// Determine whether enough pixels have been moved to add/remove a row
		if (heightInPx > convertRemToPixels(height + rowHeight)) {
			height += height + rowHeight <= rowHeight * maxRows ? rowHeight : 0;
		} else if (heightInPx < convertRemToPixels(height - rowHeight)) {
			height -= height - rowHeight >= rowHeight ? rowHeight : 0;
		}
		return;
	}

	function handleTaskbarBorderMouseDown(event: MouseEvent) {
		isResizing = true;
		startY = event.pageY;
		initial = heightInPx;

		changeCursor(Cursor.N_RESIZE);
	}

	function handleTaskbarContentDrop(e: DragEvent) {
		if (!isStringAPositiveNumber(e.dataTransfer.getData('program_id').trim())) return;
		let programId: number = Number(e.dataTransfer.getData('program_id'));
		if (isNaN(programId)) return;
		addProgramShortcut(getProgramById(programId));
	}
	function handleTaskbarContentDragOver(e: DragEvent) {
		if (!isStringAPositiveNumber(e.dataTransfer.getData('program_id').trim())) return;
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	}
	/** ENDOF EVENT HANDLERS */
</script>

<svelte:window on:mouseup={window_handleMouseUp} on:mousemove={window_handleMouseMove} />
<div class="taskbar" style="height: {height}rem; z-index: {z_index};">
	<Menu offset={height} />
	<div on:mousedown={handleTaskbarBorderMouseDown} class="border" />
	<div
		bind:this={taskbarContentElement}
		class="taskbar-content"
		style="height: {height}rem;"
		on:drop={handleTaskbarContentDrop}
		on:dragover={handleTaskbarContentDragOver}
	>
		<div class="menu-button-container">
			<MenuButton>
				<WhiskerMenu />
			</MenuButton>
		</div>
		<div class="launcher-container">
			<div class="launchers" style="grid-template-columns: {gridTemplateColumns};">
				{#each launchers as { program, row, ghost }}
					{#if ghost || !program}
						<div style="grid-row: {row}; height: {rowHeight}rem">
							<div style="padding-top: 100%;" />
						</div>
					{:else}
						<Launcher {program} {row} height={`${rowHeight}rem`} />
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.taskbar {
		// overflow: hidden;
		position: fixed;
		bottom: 0;
		width: 100%;

		background-color: var(--background-color-secondary);

		transition: height 0.25s;

		.border {
			width: 100%;
			height: 0.3rem;
			cursor: n-resize;
			background-color: rgba(0, 0, 0, 0);
			overflow: hidden;

			// Prevent border pushing other elements
			position: absolute;

			z-index: 9;
		}

		.taskbar-content {
			display: -webkit-box;
			display: -moz-box;
			display: -ms-flexbox;
			display: -webkit-flex;
			display: flex;

			-webkit-box-orient: horizontal;
			-moz-box-orient: horizontal;
			box-orient: horizontal;
			flex-direction: row;

			-webkit-box-pack: start;
			-moz-box-pack: start;
			box-pack: start;
			justify-content: start;

			-webkit-box-align: center;
			-moz-box-align: center;
			box-align: center;
			align-items: center;

			.menu-button-container {
				position: relative;
				height: 100%;
			}

			.launchers {
				width: 100%;
				display: inline-grid;
				display: -ms-inline-grid;
				display: -moz-inline-grid;
			}
		}
	}
</style>
