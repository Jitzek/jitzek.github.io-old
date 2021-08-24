<script lang="ts">
	import Shortcut from '$components/shared/grid/Shortcut.svelte';
	import { clickOutside } from '$components/shared/events/mouseOutside';

	import type { GridItem as GridItemObject } from '$objects/shared/grid/GridItem';
	import type { GridPosition as GridPositionObject } from '$objects/shared/grid/GridPosition';

	import { desktop, mobile } from '$stores/shared/DeviceTypeStore';
	import { deselectGridItem, gridStore, selectGridItem, setPreferredPositionOfGridItem } from '$stores/shared/GridStore';

	export let gridPosition: GridPositionObject;

	export let onDragStart: (x: number, y: number, item: GridItemObject) => void = (
		x: number,
		y: number,
		item: GridItemObject
	) => {};
	export let onDragMove: (x: number, y: number, item: GridItemObject) => void = (
		x: number,
		y: number,
		item: GridItemObject
	) => {};
	export let onDragEnd: (x: number, y: number, item: GridItemObject) => void = (
		x: number,
		y: number,
		item: GridItemObject
	) => {};

	let isDragging: boolean = false;

	let dragStartX: number;
	let dragStartY: number;

	function handleMoveStart(x: number, y: number) {
		dragStartX = x;
		dragStartY = y;
		isDragging = true;

        onDragStart(x, y, gridPosition.item);
	}

	/*
        The dragend event will always show 0 for the clientX and clientY on Firefox.
        As a workaround we can keep track of the end position by taking the last clientX and clientY of the dragover event.
    */
	let clientX: number;
	let clientY: number;
	function handleMove(x: number, y: number) {
        if (!isDragging) return;

		clientX = x;
		clientY = y;
        onDragMove(x, y, gridPosition.item);
	}

	function handleMoveEnd(x: number, y: number) {
        let offsetX = x - dragStartX;
		let offsetY = y - dragStartY;

		let position = $gridStore.getGridPositionAtPosition(clientX, clientY);
		// Check if the GridItem being dragged is dropped on an occupied spot
		if (position && position.item != null) {
			if (position.item == gridPosition.item) return;
			// Attempt to handle data transfer of dragged gridItems
		} else {
			// Attempt to place GridItem on grid
			$gridStore.gridItems
				.filter((gridItem) => gridItem.selected)
				.forEach((gridItem) => {
					let or_gridPosition = $gridStore.gridPositions.find(
						(position) => position.item != null && position.item.id == gridItem.id
					);
					let new_gridPosition = $gridStore.getClosestGridPositionToPosition(
						or_gridPosition.x + offsetX,
						or_gridPosition.y + offsetY,
						(position: GridPositionObject) => position.item == null || position.item == gridItem
					);
					setPreferredPositionOfGridItem(gridItem, new_gridPosition.row, new_gridPosition.column);
				});
		}
        onDragEnd(x, y, gridPosition.item);
    }

	function window_handleDragOver(e: DragEvent) {
		e.preventDefault();
		if (isDragging) {
			let gridPosition: GridPositionObject | null = $gridStore.getGridPositionAtPosition(
				e.clientX,
				e.clientY
			);
			if (
				gridPosition &&
				gridPosition.item != null &&
				gridPosition.item.id != gridPosition.item.id
			) {
				e.dataTransfer.dropEffect = 'link';
			} else {
				e.dataTransfer.dropEffect = 'move';
			}
		}
		handleMove(e.clientX, e.clientY);
	}
	let shiftDown: boolean = false;
	let ctrlDown: boolean = false;
	function window_handleKeyDown(e: KeyboardEvent) {
		shiftDown = e.shiftKey;
		ctrlDown = e.ctrlKey;
	}
	function window_handleKeyUp(e: KeyboardEvent) {
		shiftDown = e.shiftKey;
		ctrlDown = e.ctrlKey;
	}

	let touchStart: number;
	let touchTimeForOpen: number = 500;
	let touchMoving: boolean = false;
	let touchCanceled: boolean = false;
	function handleTouchStart(e: TouchEvent) {
		e.preventDefault();
		touchMoving = false;
		touchCanceled = false;
		touchStart = +new Date();
		handleMoveStart((e.target as HTMLElement).offsetLeft, (e.target as HTMLElement).offsetTop);
		setTimeout(() => {
			if (!touchCanceled && !touchMoving) {
				selectGridItem(gridPosition.item);
			}
		}, touchTimeForOpen);
	}

	function handleTouchMove(e: TouchEvent) {
		e.preventDefault();
		touchMoving = true;
		handleMove(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
	}

	function handleTouchEnd(e: TouchEvent) {
		let touchEnd: number = +new Date();
		touchCanceled = true;
		if (touchMoving && gridPosition.item.selected) {
			// This is currently bugged on Mozilla Firefox
			// preventDefault() in contextmenu listener cancels touch event generation (sends touchcancel)
			// https://bugzilla.mozilla.org/show_bug.cgi?id=1481923
			handleMoveEnd(clientX, clientY);
		} else if (!touchMoving && touchEnd - touchStart < touchTimeForOpen) {
			// Open program
			gridPosition.item.program.createProcess().bringToTop();
		}
		deselectGridItem(gridPosition.item);
	}

	function handleDragStart(e: DragEvent) {
		e.dataTransfer.setData('program_id', gridPosition.item.program.id.toString());
		handleMoveStart(e.clientX, e.clientY);
	}

	function handleDragEnd(e: DragEvent) {
		handleMoveEnd(clientX, clientY);
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
	}

	function handleClickOutside(e: MouseEvent) {
		if (ctrlDown) return;
		if (gridPosition.item.selected) {
			deselectGridItem(gridPosition.item);
		}
	}

	function handleMouseDown(e: MouseEvent) {
		selectGridItem(gridPosition.item);
	}

	function handleDoubleClick(e: MouseEvent) {
		gridPosition.item.program.createProcess().bringToTop();
	}
</script>

<svelte:window
	on:dragover={window_handleDragOver}
	on:keydown={window_handleKeyDown}
	on:keyup={window_handleKeyUp}
/>

{#if gridPosition.item == null}
	<div
		class="grid-element"
		style="grid-row: {gridPosition.row}; grid-column: {gridPosition.column}; width: {gridPosition.width}rem; height: {gridPosition.height}rem;"
	/>
{:else}
	<div
		class:desktop
		class:mobile
		class="grid-element-overlay {gridPosition.item.selected ? 'selected' : ''}"
	>
		<div
			class:desktop
			class:mobile
			class="grid-element"
			style="grid-row: {gridPosition.row}; grid-column: {gridPosition.column}; width: {gridPosition.width}rem; height: {gridPosition.height}rem;"
			draggable={true}
			on:contextmenu={(e) => e.preventDefault()}
			on:touchstart={handleTouchStart}
			on:touchmove={handleTouchMove}
			on:touchend={handleTouchEnd}
			on:dragstart={handleDragStart}
			on:dragend={handleDragEnd}
			on:drop={handleDrop}
			use:clickOutside
			on:clickoutside={handleClickOutside}
			on:mousedown={handleMouseDown}
			on:dblclick={handleDoubleClick}
		>
			<Shortcut id={gridPosition.item.id} program={gridPosition.item.program} />
		</div>
	</div>
{/if}

<style lang="scss">
	.grid-element {
		overflow: hidden;

		-moz-user-select: none;
		-webkit-user-select: none;
		user-select: none;
	}
	.grid-element-overlay {
		outline: 0 solid rgba(255, 255, 255, 0.5);
	}

	.grid-element-overlay.desktop:hover,
	.grid-element-overlay.desktop.selected {
		outline-width: 1px;
		background-color: rgba(255, 255, 255, 0.4);
	}

	.grid-element-overlay.mobile:hover,
	.grid-element-overlay.mobile.selected {
		outline-width: 1px;
		background-color: rgba(255, 255, 255, 0.4);
		/* TODO */
	}
</style>
