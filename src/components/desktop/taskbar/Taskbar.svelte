<script lang="ts">
	import { onMount } from 'svelte';
	import Launcher from '$components/desktop/taskbar/Launcher.svelte';

	// export let menuButton: string = "";
	export let backgroundColor = '#3E454A';
	export let rows: number = 1;
	export let maxRows: number = 3;
	// Total height in REM
	export let height: number = 3.5;
	// Row height in REM
	export let rowHeight: number = 3.5;

	$: {
		/**
		 * On Height Change
		 * 
		 * Prevent height from being reduced below the initial row height.
		 * Determine amount of rows for this height.
		*/
		height;
		if (height < rowHeight) height = rowHeight;
		rows = height / rowHeight;
	}

	$: {
		/**
		 * On Rows Change
		 * 
		 * Make sure the height matches the amount of rows.
		 * Prevent rows from exceeding max set amount of rows.
		*/
		rows;
		if (height / rowHeight != rows) height = rows * rowHeight;
		if (rows > maxRows) {
			rows = maxRows;
			height = rows * rowHeight;
		}
	}

	/**
	 * @param rem Rem to be converted to Pixels
	 * @returns The amount of Pixels equivalent to the amount of given Rem.
	 */
	function convertRemToPixels(rem: number) {
		return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
	}

	let heightInPx = 0;
	onMount(() => {
		// Set initial height in pixels
		heightInPx = convertRemToPixels(height);
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

		document.body.style.cursor = 'n-resize';
	}

	function stopResize() {
		resizing = false;
		start = 0;
		initial = 0;
		heightInPx = convertRemToPixels(height);

		document.body.style.cursor = 'initial';
	}

	function resize(event: MouseEvent) {
		// Only resize if the user is resizing (mouse move)
		if (!resizing) return;

		// Difference from start to end position (Y-axis)
		const delta = start - event.pageY;
		heightInPx = initial + delta;

		// Determine whether enough pixels have been moved to add/remove a row
		if (heightInPx > convertRemToPixels(height + rowHeight)) {
			height += rowHeight;
		} else if (heightInPx < convertRemToPixels(height - rowHeight)) {
			height -= rowHeight;
		}
		return;
	}

	/**
	 * Initial value
	 * 
	 * used for debugging (to be removed)
	 */
	let launchers: Array<{ icon: string; alt: string; row: number; ghost: boolean }> = [];
	launchers.push(
		{
			icon: '/static/images/icons/utilities-terminal.svg',
			alt: 'terminal launcher1',
			row: 1,
			ghost: false
		},
		{
			icon: '/static/images/icons/utilities-terminal.svg',
			alt: 'terminal launcher2',
			row: 1,
			ghost: false
		},
		{
			icon: '/static/images/icons/utilities-terminal.svg',
			alt: 'terminal launcher3',
			row: 1,
			ghost: false
		},
		{
			icon: '/static/images/icons/utilities-terminal.svg',
			alt: 'terminal launcher4',
			row: 1,
			ghost: false
		},
		{
			icon: '/static/images/icons/utilities-terminal.svg',
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
				launchers.push({ icon: '', alt: '', row: 1, ghost: true });
			}
		}

		// Set the row for each launcher
		let c_row = 1;
		launchers.forEach((launcher) => {
			if (c_row > rows) c_row = 1;
			launcher.row = c_row++;
		});
		launchers = launchers;
<<<<<<< HEAD

		// Calculate the amount of columns a row needs
=======
>>>>>>> desktop-ui
		// gridTemplateColumns = `repeat(${Math.round(launchers.length/rows)}, ${columnSize})`;
	}

	// This should be enough, having more columns doesn't seem to affect the styling.
	let gridTemplateColumns: string = `repeat(${launchers.length}, ${columnSize})`;
	$: {
		launchers;
		gridTemplateColumns = `repeat(${launchers.length}, ${columnSize})`;
	}
</script>

<svelte:window on:mouseup={stopResize} on:mousemove={resize} />

<div class="taskbar" style="background-color: {backgroundColor}; height: {height}rem">
	<div on:mousedown={startResize.bind(this)} class="border" />
	<div
		class="launcher-container"
		style="height: {height}rem; grid-template-columns: {gridTemplateColumns};"
	>
		{#each launchers as { icon, alt, row, ghost }}
			<Launcher {icon} {alt} {row} {ghost} />
		{/each}
	</div>
	<!---->
</div>

<style lang="scss">
	.taskbar {
		overflow: hidden;
		position: fixed;
		bottom: 0;
		width: 100%;

		.border {
			width: 100%;
			height: 0.3rem;
			cursor: n-resize;
			background-color: rgba(0, 0, 0, 0);
			overflow: hidden;

			// Prevent border pushing other elements
			position: absolute;
		}

		.launcher-container {
			width: 100%;
			display: inline-grid;
		}
	}
</style>
