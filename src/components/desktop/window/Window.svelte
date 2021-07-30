<script lang="ts">
	import { Cursor, changeCursor } from '$desktop/cursors';
	import { scale } from 'svelte/transition';
	import WindowCloseButton from './control_buttons/WindowCloseButton.svelte';
	import WindowMinimizeButton from './control_buttons/WindowMinimizeButton.svelte';
	import WindowResizeButton from './control_buttons/WindowResizeButton.svelte';

	export let fullscreen: boolean = false;
	export let minimized: boolean = false;
	export let z_index: number = 1;
	export let onSelection: Function = () => {};

	// Width of window in PX
	// Defaults to max available
	export let width: number = null;
	// Height of window in PX
	// Default to max available
	export let height: number = null;

	// X position of window in PX
	// Defaults to center
	export let x: number = null;
	// Y position of window in PX
	// Defaults to center
	export let y: number = null;

	// Height offset in PX
	export let heightOffset: number = 0;
	// Width offset in PX
	export let widthOffset: number = 0;

	// Minimal width of window in PX
	export let minWidth: number = 250;
	// Minimal width of window in PX
	export let minHeight: number = 250;

	let maxHeight: number = null;
	let maxWidth: number = null;

	let maxX: number;
	let maxY: number;

	let innerHeight: number;
	let innerWidth: number;

	$: {
		[widthOffset, innerWidth, fullscreen];
		maxWidth = innerWidth - widthOffset;
		maxX = Math.abs(maxWidth - width);
		if (width == null && maxWidth != null) width = maxWidth;
		if (x == null && maxX) x = maxX / 2;
		else if (x > maxX) x = maxX;
		else if (x < 0) x = 0;
	}
	$: {
		[heightOffset, innerHeight, fullscreen];
		maxHeight = innerHeight - heightOffset;
		maxY = Math.abs(maxHeight - height);
		if (height == null && maxHeight != null) height = maxHeight;
		if (y == null && maxY) y = maxY / 2;
		else if (y > maxY) y = maxY;
		else if (y < 0) y = 0;
	}
	
	let windowElement: HTMLDivElement;

	let dragPrevX: number = 0;
	let dragPrevY: number = 0;
	function handleDragStart(_x: number, _y: number) {
		isMovingWindow = true;
		if (fullscreen) {
			fullscreen = false;
			x = _x - width / 2;
			y = _y + height;
		}
		dragPrevX = _x;
		dragPrevY = _y;
	}
	function onWindowDragStart(e: DragEvent) {
		handleDragStart(e.clientX, e.clientY);
	}
	function onWindowTouchStart(e: TouchEvent) {
		e.preventDefault();
		handleDragStart(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
	}

	let isMovingWindow: boolean = false;
	function handleDragMove(_x: number, _y: number) {
		if (!isMovingWindow) return;
		let offsetX = _x - dragPrevX;
		let offsetY = _y - dragPrevY;
		dragPrevX = _x;
		dragPrevY = _y;

		x += offsetX;
		y -= offsetY;
	}
	function onDragOver(e: DragEvent) {
		e.preventDefault();
		handleDragMove(e.clientX, e.clientY);

		e.dataTransfer.dropEffect = 'move';
	}
	function onTouchMove(e: TouchEvent) {
		handleDragMove(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
	}

	function onWindowDragEnd(e: DragEvent) {
		e.preventDefault();
		isMovingWindow = false;
	}
	function onWindowTouchEnd(e: TouchEvent) {
		e.preventDefault();
		isMovingWindow = false;
	}

	enum Direction {
		TOP,
		BOTTOM,
		LEFT,
		RIGHT,
		TOPRIGHT,
		TOPLEFT,
		BOTTOMRIGHT,
		BOTTOMLEFT
	}
	let direction: Direction;
	let prevResizeX: number = 0;
	let prevResizeY: number = 0;
	let resizing: boolean = false;
	let dragHeight: number = height;
	let dragWidth: number = width;
	let dragX: number = x;
	let dragY: number = y;
	function handleWindowResizeStart(x: number, y: number) {
		prevResizeX = x;
		prevResizeY = y;
		resizing = true;
	}

	let cursorForDirection: Map<Direction, Cursor> = new Map([
		[Direction.TOP, Cursor.N_RESIZE],
		[Direction.BOTTOM, Cursor.S_RESIZE],
		[Direction.LEFT, Cursor.W_RESIZE],
		[Direction.RIGHT, Cursor.E_RESIZE],

		[Direction.TOPLEFT, Cursor.NW_RESIZE],
		[Direction.TOPRIGHT, Cursor.NE_RESIZE],
		[Direction.BOTTOMLEFT, Cursor.SW_RESIZE],
		[Direction.BOTTOMRIGHT, Cursor.SE_RESIZE]
	]);
	function startWindowResize(e: MouseEvent, _direction: Direction) {
		direction = _direction;
		handleWindowResizeStart(e.clientX, e.clientY);
		changeCursor(cursorForDirection.get(direction));
		dragX = x;
		dragY = y;
		dragHeight = height;
		dragWidth = width;

		// Prevent content from being selected while resizing the window
		windowElement.style.userSelect = 'none';
	}
	function resizeWindow(e: MouseEvent) {
		if (!resizing) return;
		let offsetX: number = e.clientX - prevResizeX;
		let offsetY: number = e.clientY - prevResizeY;
		if (
			direction == Direction.TOP ||
			direction == Direction.TOPLEFT ||
			direction == Direction.TOPRIGHT
		) {
			if (dragY - offsetY < maxY) {
				height -= offsetY;
				dragHeight -= offsetY;
			}
		}
		if (
			direction == Direction.BOTTOM ||
			direction == Direction.BOTTOMLEFT ||
			direction == Direction.BOTTOMRIGHT
		) {
			if (dragY - offsetY > 0) {
				if (dragHeight + offsetY >= minHeight) {
					y -= offsetY;
					height += offsetY;
				}
				dragHeight += offsetY;
			}
			dragY -= offsetY;
		}
		if (
			direction == Direction.RIGHT ||
			direction == Direction.TOPRIGHT ||
			direction == Direction.BOTTOMRIGHT
		) {
			if (dragX + offsetX < maxX) {
				width += offsetX;
				dragWidth += offsetX;
			}
		}
		if (
			direction == Direction.LEFT ||
			direction == Direction.TOPLEFT ||
			direction == Direction.BOTTOMLEFT
		) {
			if (dragX + offsetX > 0) {
				if (dragWidth - offsetX >= minWidth) {
					x += offsetX;
					width -= offsetX;
				}
				dragWidth -= offsetX;
			}
			dragX += offsetX;
		}
		prevResizeX = e.clientX;
		prevResizeY = e.clientY;
	}
	function stopWindowResize(e: MouseEvent) {
		resizing = false;
		changeCursor(Cursor.AUTO);

		if (height < minHeight) height = minHeight;
		if (width < minWidth) width = minWidth;

		windowElement.style.userSelect = 'initial';
	}

	function onWindowDoubleClick(e: MouseEvent) {
		fullscreen = !fullscreen;
	}
</script>

<svelte:window
	bind:innerHeight
	bind:innerWidth
	on:dragover={onDragOver}
	on:touchmove={onTouchMove}
	on:mouseup={stopWindowResize}
	on:mousemove={resizeWindow}
/>

{#if !minimized}
	<div
		bind:this={windowElement}
		class="window"
		style="
			width: {fullscreen ? maxWidth : width + x <= maxWidth ? width : maxWidth - x}px;
			height: {fullscreen ? maxHeight : height + y <= maxHeight ? height : maxHeight - y}px; 
			bottom: {heightOffset}px;
			transform: translate({fullscreen ? 0 : x}px, -{fullscreen ? 0 : y}px);
			min-width: {minWidth}px;
			min-height: {minHeight}px;
			z-index: {z_index};
			"
		in:scale={{ duration: 250 }}
		out:scale={{ duration: 250 }}
		on:mousedown={onSelection()}
	>
		<!-- Draggable bar -->
		<div
			class="control-bar"
			draggable="true"
			on:dragstart={onWindowDragStart}
			on:touchstart={onWindowTouchStart}
			on:dragend={onWindowDragEnd}
			on:touchend={onWindowTouchEnd}
			on:dblclick={onWindowDoubleClick}
		>
			<div class="control-buttons">
				<WindowMinimizeButton
					width={'2.5rem'}
					height={'100%'}
					on:click={() => (minimized = true)}
				/>
				<WindowResizeButton
					isFullscreen={fullscreen}
					width={'2.5rem'}
					height={'100%'}
					on:click={() => (fullscreen = !fullscreen)}
				/>
				<WindowCloseButton width={'2.5rem'} height={'100%'} />
			</div>
		</div>
		<div class="window-content">
			<h1>Window</h1>
		</div>

		{#if !fullscreen}
			<div on:mousedown={(e) => startWindowResize(e, Direction.TOP)} class="border-top" />
			<div on:mousedown={(e) => startWindowResize(e, Direction.LEFT)} class="border-left" />
			<div on:mousedown={(e) => startWindowResize(e, Direction.RIGHT)} class="border-right" />
			<div on:mousedown={(e) => startWindowResize(e, Direction.BOTTOM)} class="border-bottom" />

			<div on:mousedown={(e) => startWindowResize(e, Direction.TOPLEFT)} class="border-top-left" />
			<div
				on:mousedown={(e) => startWindowResize(e, Direction.TOPRIGHT)}
				class="border-top-right"
			/>
			<div
				on:mousedown={(e) => startWindowResize(e, Direction.BOTTOMLEFT)}
				class="border-bottom-left"
			/>
			<div
				on:mousedown={(e) => startWindowResize(e, Direction.BOTTOMRIGHT)}
				class="border-bottom-right"
			/>
		{/if}
	</div>
{/if}

<style lang="scss">
	$--border-offset: -2px;

	.window {
		background-color: var(--background-color-application);
		position: absolute;
		margin-left: auto;
		margin-right: auto;
		// outline: 1px solid black;

		overflow: hidden;

		.control-bar {
			height: 2rem;
			width: 100%;
			background-color: var(--border-color-application);

			.control-buttons {
				float: right;
				height: 100%;
				width: auto;
				display: flex;
			}
		}

		.window-content {
			margin: 0.5rem;
		}

		.border-top,
		.border-bottom,
		.border-left,
		.border-right,
		.border-top-left,
		.border-top-right,
		.border-bottom-left,
		.border-bottom-right {
			background-color: black;
			overflow: hidden;

			// Prevent border pushing other elements
			position: absolute;

			z-index: 9;
		}
		.border-top,
		.border-bottom {
			width: 100%;
			height: 0.3rem;
			left: 0;
		}
		.border-top {
			top: $--border-offset;
			cursor: n-resize;
		}
		.border-bottom {
			bottom: $--border-offset;
			cursor: s-resize;
		}
		.border-left,
		.border-right {
			height: 100%;
			width: 0.3rem;
			top: 0;
		}
		.border-left {
			left: $--border-offset;
			cursor: w-resize;
		}
		.border-right {
			right: $--border-offset;
			cursor: e-resize;
		}

		.border-top-left,
		.border-top-right,
		.border-bottom-left,
		.border-bottom-right {
			background-color: blue;
			width: 0.5rem;
			height: 0.5rem;
		}
		.border-top-left {
			top: $--border-offset;
			left: $--border-offset;
			cursor: nw-resize;
		}
		.border-top-right {
			top: $--border-offset;
			right: $--border-offset;
			cursor: ne-resize;
		}
		.border-bottom-left {
			bottom: $--border-offset;
			left: $--border-offset;
			cursor: sw-resize;
		}
		.border-bottom-right {
			bottom: $--border-offset;
			right: $--border-offset;
			cursor: se-resize;
		}
	}
</style>
