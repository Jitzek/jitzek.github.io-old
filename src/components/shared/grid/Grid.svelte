<script lang="ts">
	import Program from '$components/desktop/Program.svelte';
	import { convertRemToPixels } from '$shared/conversions';
	import { clickOutside } from '$components/shared/events/mouseOutside';
	import { changeCursor, Cursor } from '$components/desktop/cursors';

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
			let offsetX = convertRemToPixels(gap * 2);
			let offsetY = convertRemToPixels(gap * 2);

			// if (this.column == 1 || this.column == columnsPerRow) {
			// 	offsetX += convertRemToPixels(widthOffset / 2);
			// }
			// if (this.row == 1 || this.row == rows) {
			// 	offsetY += convertRemToPixels(heightOffset / 2);
			// }

			return (
				x > this.x - columnWidth / 2 - offsetX &&
				x < this.x + columnWidth / 2 + offsetX &&
				y > this.y - columnHeight / 2 - offsetY &&
				y < this.y + columnHeight / 2 + offsetY
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
		gridObjects.forEach((gridObject) => {
			let preferredRow = gridObject.preferredRow;
			let preferredColumn = gridObject.preferredColumn;
			if (gridObject.preferredRow < 0 || gridObject.preferredRow > rows) {
				preferredRow = rows;
			}
			if (gridObject.preferredColumn < 0 || gridObject.preferredColumn > columnsPerRow) {
				preferredColumn = columnsPerRow;
			}

			/*
				Rearrange GridObjects to fit within grid.
				Automatically return GridObjects to their preferred position.
			*/
			let done: boolean = false;
			for (preferredRow; preferredRow > 0; preferredRow--) {
				if (done) break;
				for (preferredColumn; preferredColumn > 0; preferredColumn--) {
					let preferredGridPosition: GridPosition = gridPositions.find(
						(position) =>
							position.row == preferredRow &&
							position.column == preferredColumn &&
							position.object == null
					);
					if (preferredGridPosition) {
						preferredGridPosition.object = gridObject;
						done = true;
						break;
					}
				}
				preferredColumn = columnsPerRow;
			}
		});
		gridPositions = gridPositions;
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

	function onGridElementMouseDown(e: MouseEvent, object: GridObject) {
		if (!object.selected && !ctrlDown) {
			gridObjects.forEach((_object) => (_object.selected = _object.id == object.id));
		}

		object.selected = true;

		gridObjects = gridObjects;
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
	function onGridElementDragStart(e: DragEvent, object: GridObject) {
		startX = e.clientX;
		startY = e.clientY;
		draggingGridElement = true;
		gridObjectBeingDragged = object;

		// e.dataTransfer.effectAllowed = 'move';
	}

	function getGridPositionAtPosition(x: number, y: number): GridPosition | null {
		return gridPositions.find((position) => position.collidesWith(x, y));
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
				e.dataTransfer.dropEffect = 'none';
			} else {
				e.dataTransfer.dropEffect = 'move';
			}
		}
	}
	function onDrop(e: DragEvent) {
		// e.preventDefault();
	}

	function onGridElementDragEnd(e: MouseEvent, object: GridObject) {
		let offsetX = clientX - startX;
		let offsetY = clientY - startY;

		gridObjects.forEach((gridObject) => {
			if (!gridObject.selected) return;
			let or_gridPosition = gridPositions.find(
				(position) => position.object != null && position.object.id == gridObject.id
			);
			let new_gridPosition = gridPositions.find((position) =>
				position.collidesWith(or_gridPosition.x + offsetX, or_gridPosition.y + offsetY)
			);
			if (new_gridPosition) {
				if (new_gridPosition && new_gridPosition.object == null) {
					gridObject.preferredRow = new_gridPosition.row;
					gridObject.preferredColumn = new_gridPosition.column;
				} else {
					// Do nothing for now
				}
			}
		});

		gridObjects = gridObjects;
	}

	addGridElement(1, 1);
	addGridElement(2, 1);
</script>

<svelte:window
	bind:innerWidth={screenWidth}
	bind:innerHeight={screenHeight}
	on:keydown={onKeyDown}
	on:keyup={onKeyUp}
/>

<div
	class="grid"
	style="grid-template-columns: {gridTemplateColumns}; gap: {gap}rem; padding: {padding}rem;"
	on:dragover={onDragOver}
	on:drop={onDrop}
>
	{#each gridPositions as { object, row, column }}
		{#if object == null}
			<div
				class="grid-element"
				style="grid-row: {row}; grid-column: {column}; width: {columnWidth}rem; height: {columnHeight}rem;"
			/>
		{:else}
			<div class="grid-element-overlay {object.selected ? 'selected' : ''}">
				<div
					class="grid-element"
					style="grid-row: {row}; grid-column: {column}; width: {columnWidth}rem; height: {columnHeight}rem;"
					draggable={true}
					on:dragstart={(e) => onGridElementDragStart(e, object)}
					on:dragend={(e) => onGridElementDragEnd(e, object)}
					use:clickOutside
					on:clickoutside={(e) => onGridElementMouseClickOutside(e, object)}
					on:mousedown={(e) => onGridElementMouseDown(e, object)}
				>
					<Program
						icon="/images/icons/utilities-terminal.svg"
						name="terminalterminal {object.id}"
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
		}
		.grid-element-overlay {
			outline: 0 solid rgba(255, 255, 255, 0.5);
		}

		.grid-element-overlay:hover,
		.grid-element-overlay.selected {
			outline-width: 1px;
			background-color: rgba(255, 255, 255, 0.4);
		}
	}
</style>
