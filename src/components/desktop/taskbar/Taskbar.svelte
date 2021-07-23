<script lang="ts">
	import { onMount } from 'svelte';
	import Launcher from '$components/desktop/taskbar/Launcher.svelte';
	import MenuButton from '$components/desktop/taskbar/MenuButton.svelte';
	import Menu from '$components/desktop/taskbar/menu/Menu.svelte';

	import { convertRemToPixels } from '$shared/conversions';
	import WhiskerMenu from '$components/shared/svg/whisker-menu.svelte';
import { changeCursor, Cursor } from '../cursors';

	// export let menuButton: string = "";
	export let rows: number = 1;
	export let maxRows: number = 3;
	// Total height in REM
	export let height: number = 3.5;
	// Row height in REM
	export let rowHeight: number = 3.5;

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
	}

	let taskbar: HTMLDivElement;

	let heightInPx = 0;
	onMount(() => {
		// Set initial height in pixels
		heightInPx = convertRemToPixels(height);

		// Disable image dragging
		taskbar.ondragstart = () => { return false; }
	});

	// Start of resize event (mouse down)
	let start: number = 0;
	// The initial height at the start of the resize event (mouse down)
	let initial: number = 0;
	// true if the user is resizing, false if not
	let resizing: boolean = false;
	function startResize(event: MouseEvent) {
		resizing = true;
		start = event.pageY;
		initial = heightInPx;
		
		changeCursor(Cursor.N_RESIZE);
	}

	function stopResize() {
		resizing = false;
		start = 0;
		initial = 0;
		heightInPx = convertRemToPixels(height);

		changeCursor(Cursor.DEFAULT);
	}

	function resize(event: MouseEvent) {
		// Only resize if the user is resizing (mouse move)
		if (!resizing) return;

		// Difference from start to end position (Y-axis)
		const delta = start - event.pageY;
		heightInPx = initial + delta;

		// Determine whether enough pixels have been moved to add/remove a row
		if (heightInPx > convertRemToPixels(height + rowHeight)) {
			height += height + rowHeight <= (rowHeight * maxRows) ? rowHeight : 0;
		} else if (heightInPx < convertRemToPixels(height - rowHeight)) {
			height -= height - rowHeight >= rowHeight ? rowHeight : 0;
		}
		return;
	}

	class LauncherObject {
		name: string;
		icon: string;
		alt: string;
		row: number;
		ghost: boolean;
	}
	/**
	 * Initial value
	 *
	 * used for debugging (to be removed)
	 */
	let launchers: Array<LauncherObject> = [];
	launchers.push(
		{
			name: 'Terminal 1',
			icon: '/images/icons/utilities-terminal.svg',
			alt: 'terminal launcher1',
			row: 1,
			ghost: false
		},
		{
			name: 'Terminal 2',
			icon: '/images/icons/utilities-terminal.svg',
			alt: 'terminal launcher2',
			row: 1,
			ghost: false
		},
		{
			name: 'Terminal 3',
			icon: '/images/icons/utilities-terminal.svg',
			alt: 'terminal launcher3',
			row: 1,
			ghost: false
		},
		{
			name: 'Terminal 4',
			icon: '/images/icons/utilities-terminal.svg',
			alt: 'terminal launcher4',
			row: 1,
			ghost: false
		},
		{
			name: 'Terminal 5',
			icon: '/images/icons/utilities-terminal.svg',
			alt: 'terminal launcher5',
			row: 1,
			ghost: false
		}
		// { icon: "", alt: "", row: 1, ghost: true },
	);

	const columnSize: string = `${rowHeight}rem`;
	$: {
		rows;

		// Filter out ghost launchers
		launchers = launchers.filter((launcher) => !launcher.ghost);
		if (rows > launchers.length) {
			// Add ghost launchers to fill up whitespace
			for (let i = 0; i < rows - launchers.length; i++) {
				launchers.push({ name: null, icon: '', alt: '', row: 1, ghost: true });
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

	// This should be enough, having more columns doesn't seem to affect the styling.
	let gridTemplateColumns: string = `repeat(${launchers.length}, ${columnSize})`;
	$: {
		launchers;
		gridTemplateColumns = `repeat(${launchers.length}, ${columnSize})`;
	}

	let showMenu: boolean = false;
	function toggleMenu() {
		showMenu = !showMenu;
	}
</script>

<svelte:window on:mouseup={stopResize} on:mousemove={resize} />
<div bind:this="{taskbar}" class="taskbar" style="height: {height}rem;">
	<Menu offset={height} bind:show={showMenu} />
	<div on:mousedown={startResize.bind(this)} class="border" />
	<div class="taskbar-content" style="height: {height}rem;">
		<div class="menu-button-container">
			<MenuButton on:click={toggleMenu} bind:activated={showMenu}>
				<!-- <img {src} alt="Navigation Menu" width="auto" height="auto" /> -->
				<WhiskerMenu />
			</MenuButton>
		</div>
		<div class="launcher-container">
			<div class="launchers" style="grid-template-columns: {gridTemplateColumns};">
				{#each launchers as { name, icon, alt, row, ghost }}
					<Launcher {name} {icon} {alt} {row} {ghost} height={`${rowHeight}rem`} />
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
			flex-direction: c;

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
