<script lang="ts">
	/** IMPORTS */
	// "svelte"
	//

	// "components"
	import GridPosition from '$components/shared/grid/GridPosition.svelte';
	//

	// "objects"
	import { GridItem as GridItemObject } from '$objects/shared/grid/GridItem';
	import type { GridPosition as GridPositionObject } from '$objects/shared/grid/GridPosition';
	import { isStringAPositiveNumber } from '$objects/shared/typechecks';
	//

	// "stores"
	import { hideMenu } from '$stores/desktop/MenuStore';
	import { getProgramById } from '$stores/shared/ProgramsStore';
	import {
		addGridItem,
		gridStore,
		rearrangeGrid,
		setGridParameters,
		setPreferredPositionOfGridItem
	} from '$stores/shared/GridStore';
	//

	/** ENDOF IMPORTS*/

	/** EXPORTS */
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
	/** ENDOF EXPORTS */

	/** VARIABLE DECLARATION */
	let screenWidth: number;
	let screenHeight: number;

	let gridItemBeingDragged: GridItemObject = null;
	/** ENDOF VARIABLE DECLERATION */

	/** STORE CALLBACKS */
	//
	/** ENDOF STORE CALLBACKS */

	/** REACTIVE VARIABLES */
	$: {
		[screenWidth, screenHeight, gap, widthOffset, heightOffset, padding, columnWidth, columnHeight];
		setGridParameters(gap, widthOffset, heightOffset, padding, columnWidth, columnHeight);
		if (screenWidth && screenHeight) {
			rearrangeGrid(screenWidth, screenHeight);
		}
	}
	/** ENDOF REACTIVE VARIABLES */

	/** HELPER FUNCTIONS */
	//
	/** ENDOF HELPER FUNCTIONS */

	/** EVENT HANDLERS */
	function handleGridDrop(e: DragEvent) {
		if (gridItemBeingDragged != null) {
			let offsetX = e.clientX - gridItemBeingDragged.position.x;
			let offsetY = e.clientY - gridItemBeingDragged.position.y;

			let position = $gridStore.getGridPositionAtPosition(e.clientX, e.clientY);
			// Check if the GridItem being dragged is dropped on an occupied spot
			if (position && position.item != null) {
				if (position.item == gridItemBeingDragged) return;
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
			gridItemBeingDragged = null;
			return;
		}

		let position = $gridStore.getClosestGridPositionToPosition(e.clientX, e.clientY);
		if (position.item !== null) {
			// Position is already occupied by another grid item
			// Do nothing for now
			return;
		} else {
			console.log(isStringAPositiveNumber(e.dataTransfer.getData('program_id').trim()));
			if (!isStringAPositiveNumber(e.dataTransfer.getData('program_id').trim())) return;
			let programId: number = Number(e.dataTransfer.getData('program_id'));
			if (isNaN(programId)) return;
			addGridItem(new GridItemObject(getProgramById(programId), position.row, position.column));
		}
	}

	function handleGridItemDragStart(x: number, y: number, item: GridItemObject) {
		gridItemBeingDragged = item;
	}
	function handleGridItemDragMove(x: number, y: number, item: GridItemObject) {
		return;
	}
	function handleGridItemDragEnd(x: number, y: number, item: GridItemObject) {
		return;
	}
	/** ENDOF EVENT HANDLERS */
</script>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />

<div
	class="grid"
	style="grid-template-columns: {$gridStore.gridTemplateColumns}; gap: {$gridStore.gap}rem; padding: {$gridStore.padding}rem;"
	on:mousedown={hideMenu}
	on:drop={handleGridDrop}
>
	{#each $gridStore.gridPositions as gridPosition}
		<GridPosition
			{gridPosition}
			onDragStart={handleGridItemDragStart}
			onDragMove={handleGridItemDragMove}
			onDragEnd={handleGridItemDragEnd}
		/>
	{/each}
</div>

<style lang="scss">
	.grid {
		display: inline-grid;
		display: -ms-inline-grid;
		display: -moz-inline-grid;
		overflow: hidden;
	}
</style>
