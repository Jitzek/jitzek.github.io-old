<script lang="ts">
	import Shortcut from '$components/shared/grid/Shortcut.svelte';
	import { clickOutside } from '$components/shared/events/mouseOutside';

	import { convertRemToPixels } from '$objects/shared/conversions';

	import { desktop as desktop_store, mobile as mobile_store } from '$stores/shared/DeviceTypeStore';
import { hideMenu } from '$stores/desktop/MenuStore';

	export let widthOffset: number = 0;
	export let heightOffset: number = 0;

	// Column width in Rem
	export let columnWidth: number = 3;
	// Column height in Rem
	export let columnHeight: number = 4;

	// Gaps between columns and rows in Rem
	export let gap: number = 2.5;
	// Padding of the grid in Rem
	export let padding: number = 1;

	let desktop = $desktop_store;
	let mobile = $mobile_store;
	desktop_store.subscribe((value) => (desktop = value));
	mobile_store.subscribe((value) => (mobile = value));

	let screenWidth: number;
	let screenHeight: number;
	let gridTemplateColumns: string = '';

	class GridObject {
		id: number;
		element: HTMLElement;
		preferredRow: number;
		preferredColumn: number;
		selected: boolean;
	}

	class GridPosition {
		constructor(
			public object: GridObject | null,
			public row: number,
			public column: number,
			public x: number,
			public y: number
		) {}

		public collidesWith(x: number, y: number) {
			return (
				x > this.x - convertRemToPixels(columnWidth / 2) + convertRemToPixels(gap / 2) &&
				x < this.x + convertRemToPixels(columnWidth / 2) + convertRemToPixels(gap / 2) &&
				y > this.y - convertRemToPixels(columnHeight / 2) + convertRemToPixels(gap / 2) &&
				y < this.y + convertRemToPixels(columnHeight / 2) + convertRemToPixels(gap / 2)
			);
		}
	}

	let gridObjects: Array<GridObject> = [];
	let gridPositions: Array<GridPosition> = [];

	let rows: number;
	let columnsPerRow: number;

	$: {
		[screenWidth, screenHeight, widthOffset, heightOffset, gridObjects];
		rows = Math.floor(
			(screenHeight - convertRemToPixels(padding + heightOffset)) /
				convertRemToPixels(columnHeight + gap)
		);
		columnsPerRow = Math.round(
			(screenWidth - convertRemToPixels(padding)) /
				convertRemToPixels(columnWidth + gap + widthOffset)
		);
		gridTemplateColumns = `repeat(${columnsPerRow}, ${columnWidth}rem)`;

		gridPositions = [];
		// Fill up grid with empty grid positions
		for (let row = 1; row < rows + 1; row++) {
			for (let column = 1; column < columnsPerRow + 1; column++) {
				gridPositions.push(
					new GridPosition(
						null,
						row,
						column,
						column * convertRemToPixels(columnWidth + gap) -
							convertRemToPixels(gap + columnWidth / 2),
						row * convertRemToPixels(columnHeight + gap) -
							convertRemToPixels(gap + columnHeight / 2)
					)
				);
			}
		}

		/*
			Assign GridObjects to GridPositions.
			Rearrange GridObjects to fit within grid.
			Automatically return GridObjects to their preferred position.
		*/
		if (gridPositions.length > 0) {
			gridObjects.forEach((gridObject) => {
				let preferredRow = gridObject.preferredRow;
				let preferredColumn = gridObject.preferredColumn;
				if (gridObject.preferredRow < 0 || gridObject.preferredRow > rows) {
					preferredRow = rows;
				}
				if (gridObject.preferredColumn < 0 || gridObject.preferredColumn > columnsPerRow) {
					preferredColumn = columnsPerRow;
				}

				let emptyGridPositions = gridPositions.filter((position) => position.object == null);
				if (emptyGridPositions.length > 0) {
					let preferredGridPosition = emptyGridPositions.reduce((prev, current) => {
						return Math.abs(current.row - preferredRow) < Math.abs(prev.row - preferredRow) ||
							Math.abs(current.column - preferredColumn) < Math.abs(prev.column - preferredColumn)
							? current
							: prev;
					});
					preferredGridPosition.object = gridObject;
				}
			});
		}
		gridPositions = gridPositions;
	}

	function getGridPositionAtPosition(x: number, y: number): GridPosition | null {
		return gridPositions.find((position) => position.collidesWith(x, y));
	}

	function getClosestGridPositionToPosition(
		x: number,
		y: number,
		filter: (position: GridPosition) => boolean = () => true
	): GridPosition | null {
		return gridPositions.filter(filter).reduce((prev, current) => {
			return Math.abs(current.x - x) < Math.abs(prev.x - x) ||
				Math.abs(current.y - y) < Math.abs(prev.y - y)
				? current
				: prev;
		});
	}

	let c_id = 0;
	function addGridElement(row: number, column: number) {
		gridObjects.push({
			id: c_id++,
			element: null,
			preferredRow: row,
			preferredColumn: column,
			selected: false
		});
		gridObjects = gridObjects;
	}

	let shiftDown: boolean = false;
	let ctrlDown: boolean = false;
	function onKeyDown(e: KeyboardEvent) {
		shiftDown = e.shiftKey;
		ctrlDown = e.ctrlKey;
	}
	function onKeyUp(e: KeyboardEvent) {
		shiftDown = e.shiftKey;
		ctrlDown = e.ctrlKey;
	}
	function onDrop(e: DragEvent) {
		// GridObject drop is handled in the dragend event
		if (gridObjectBeingDragged != null) return;
	}

	function selectObject(object: GridObject) {
		object.selected = true;
		gridObjects = gridObjects;
	}
	function deselectObject(object: GridObject) {
		object.selected = false;
		gridObjects = gridObjects;
	}

	function onGridElementMouseDown(e: MouseEvent, object: GridObject) {
		if (!object.selected && !ctrlDown) {
			gridObjects.forEach((_object) => (_object.selected = _object.id == object.id));
		}

		selectObject(object);
	}

	function onGridElementMouseClickOutside(e: MouseEvent, object: GridObject) {
		if (ctrlDown) {
			return;
		}
		if (object.selected) {
			object.selected = false;
			gridObjects = gridObjects;
		}
	}

	let draggingGridElement: boolean = false;
	let gridObjectBeingDragged: GridObject;

	let startX: number;
	let startY: number;

	function handleGridElementDragStart(x: number, y: number, object: GridObject) {
		startX = x;
		startY = y;
		draggingGridElement = true;
		gridObjectBeingDragged = object;
	}

	function handleGridElementDragEnd(x: number, y: number, object: GridObject) {
		let offsetX = x - startX;
		let offsetY = y - startY;

		let position = getGridPositionAtPosition(clientX, clientY);
		// Check if the gridObject being dragged is dropped on an occupied spot
		if (position && position.object != null) {
			if (position.object == object) return;
			// Attempt to handle data transfer of dragged gridObjects
		} else {
			// Attempt to place gridObject on grid
			gridObjects
				.filter((gridObject) => gridObject.selected)
				.forEach((gridObject) => {
					let or_gridPosition = gridPositions.find(
						(position) => position.object != null && position.object.id == gridObject.id
					);
					let new_gridPosition = getClosestGridPositionToPosition(
						or_gridPosition.x + offsetX,
						or_gridPosition.y + offsetY,
						(position: GridPosition) => position.object == null || position.object == gridObject
					);
					gridObject.preferredRow = new_gridPosition.row;
					gridObject.preferredColumn = new_gridPosition.column;
				});
		}
		gridObjectBeingDragged = null;
		gridObjects = gridObjects;
	}

	function onGridElementDragStart(e: DragEvent, object: GridObject) {
		handleGridElementDragStart(e.clientX, e.clientY, object);
	}

	let touchStart: number;
	let touchTimeForOpen: number = 500;
	let touchMoving: boolean = false;
	let touchCanceled: boolean = false;
	function onGridElementTouchStart(e: TouchEvent, object: GridObject) {
		e.preventDefault();
		touchMoving = false;
		touchCanceled = false;
		touchStart = +new Date();
		handleGridElementDragStart(
			(e.target as HTMLElement).offsetLeft,
			(e.target as HTMLElement).offsetTop,
			object
		);
		setTimeout(() => {
			if (!touchCanceled && !touchMoving) {
				selectObject(object);
			}
		}, touchTimeForOpen);
	}

	/*
        The dragend event will always show 0 for the clientX and clientY on Firefox.
        As a workaround we can keep track of the end position by taking the last clientX and clientY of the dragover event.
    */
	let clientX: number;
	let clientY: number;
	function onDragOver(e: DragEvent) {
		e.preventDefault();

		clientX = e.clientX;
		clientY = e.clientY;
		if (draggingGridElement) {
			let gridPosition: GridPosition | null = getGridPositionAtPosition(clientX, clientY);
			if (
				gridPosition &&
				gridPosition.object != null &&
				gridPosition.object.id != gridObjectBeingDragged.id
			) {
				e.dataTransfer.dropEffect = 'link';
			} else {
				e.dataTransfer.dropEffect = 'move';
			}
		}
	}
	function onTouchMove(e: TouchEvent, object: GridObject) {
		touchMoving = true;
		e.preventDefault();
		clientX = e.targetTouches[0].clientX;
		clientY = e.targetTouches[0].clientY;
	}

	function onGridElementDrop(e: DragEvent, object: GridObject) {
		e.preventDefault();
	}

	function onGridElementDragEnd(e: MouseEvent, object: GridObject) {
		handleGridElementDragEnd(clientX, clientY, object);
	}

	function onGridElementTouchEnd(e: TouchEvent, object: GridObject) {
		let touchEnd: number = +new Date();
		touchCanceled = true;
		if (touchMoving && object.selected) {
			// This is currently bugged on Mozilla Firefox
			// preventDefault() in contextmenu listener cancels touch event generation (sends touchcancel)
			// https://bugzilla.mozilla.org/show_bug.cgi?id=1481923
			handleGridElementDragEnd(clientX, clientY, object);
		} else if (!touchMoving && touchEnd - touchStart < touchTimeForOpen) {
			// Open program
			console.log(`Open program ${object.id}`);
		}
		deselectObject(object);
	}

	function onGridElementDoubleClick(e: MouseEvent, object: GridObject) {
		console.log(`Open application ${object.id}`);
	}

	addGridElement(1, 1);
	addGridElement(1, 2);
	addGridElement(1, 3);
	addGridElement(2, 1);
	addGridElement(3, 1);
</script>

<svelte:window
	bind:innerWidth={screenWidth}
	bind:innerHeight={screenHeight}
	on:keydown={onKeyDown}
	on:keyup={onKeyUp}
	on:drop={onDrop}
/>

<div
	class="grid"
	style="grid-template-columns: {gridTemplateColumns}; gap: {gap}rem; padding: {padding}rem;"
	on:dragover={onDragOver}
	on:mousedown={hideMenu}
>
	{#each gridPositions as { object, row, column }}
		{#if object == null}
			<div
				class="grid-element"
				style="grid-row: {row}; grid-column: {column}; width: {columnWidth}rem; height: {columnHeight}rem;"
			/>
		{:else}
			<div
				class:desktop
				class:mobile
				class="grid-element-overlay {object.selected ? 'selected' : ''}"
			>
				<div
					class:desktop
					class:mobile
					class="grid-element"
					style="grid-row: {row}; grid-column: {column}; width: {columnWidth}rem; height: {columnHeight}rem;"
					draggable={true}
					on:contextmenu={(e) => e.preventDefault()}
					on:touchstart={(e) => onGridElementTouchStart(e, object)}
					on:touchend={(e) => onGridElementTouchEnd(e, object)}
					on:touchmove={(e) => onTouchMove(e, object)}
					on:dragstart={(e) => onGridElementDragStart(e, object)}
					on:dragend={(e) => onGridElementDragEnd(e, object)}
					on:drop={(e) => onGridElementDrop(e, object)}
					use:clickOutside
					on:clickoutside={(e) => onGridElementMouseClickOutside(e, object)}
					on:mousedown={(e) => onGridElementMouseDown(e, object)}
					on:dblclick={(e) => onGridElementDoubleClick(e, object)}
				>
					<Shortcut
						icon="/images/program-icons/utilities-terminal.svg"
						name="terminal {object.id}"
					/>
				</div>
			</div>
		{/if}
	{/each}
</div>

<style lang="scss">
	.grid {
		display: inline-grid;
		display: -ms-inline-grid;
		display: -moz-inline-grid;
		overflow: hidden;

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
	}
</style>
