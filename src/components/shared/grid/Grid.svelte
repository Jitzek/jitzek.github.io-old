<script lang="ts">
	import Program from '$components/desktop/Program.svelte';
	import { convertRemToPixels } from '$shared/conversions';

	export let widthOffset: number = 0;
	export let heightOffset: number = 0;

	// Column width in Rem
	export let columnWidth: number = 3;
	// Column height in Rem
	export let columnHeight: number = 4;
	// Gaps between columns and rows in Rem
	const gap: number = 2.5;
	// Padding of the grid in Rem
	const gridPadding: number = 1;

	// Taskbar height in Rem

	let screenWidth: number;
	let screenHeight: number;
	let gridTemplateColumns: string = `repeat("2"}, "3rem")`;

	let slotObject: HTMLSpanElement;

	$: {
		[screenWidth, screenHeight, widthOffset, heightOffset];
		if (slotObject) {
			arrangeGrid();
		}
	}

	let grid: HTMLDivElement;

	let children: Array<HTMLElement> = [];

	// Simple temporary grid arranger
	function arrangeGrid() {
		for (let i = 0; i < slotObject.children.length; i++) {
			children.push(slotObject.children.item(i) as HTMLElement);
		}
		children.forEach((child) => {
			let row = Number(child.dataset.row) || 0;
			let column = Number(child.dataset.column) || 0;
			let columnsPerRow = Math.floor(
				(screenWidth - convertRemToPixels(gridPadding)) / convertRemToPixels(columnWidth + gap + widthOffset)
			);
			let rows = Math.floor(
				(screenHeight - convertRemToPixels(gridPadding)) /
					convertRemToPixels(columnHeight + gap + heightOffset)
			);
			gridTemplateColumns = `repeat(${columnsPerRow}, ${columnWidth}rem)`;

			let columnBlocked: boolean = children.find((_child) => _child != child && row == Number(_child.dataset.row) && column - 1 <= Number(_child.dataset.column)) != null;
			let rowBlocked: boolean = children.find((_child) => _child != child && column == Number(_child.dataset.column) && row - 1 <= Number(_child.dataset.row)) != null;
			child.style.gridRow = row <= rows && !columnBlocked ? `${row}` : 'auto';
			child.style.gridColumn = column <= columnsPerRow && !rowBlocked  ? `${column}` : 'auto';

			try {
				grid.replaceChild(child, child);
			} catch {
				grid.appendChild(child);
			}
		});
	}

	$: {
		slotObject;
		if (slotObject) {
			arrangeGrid();
		}
	}

	// $: {
	// 	gridObjects;
	// 	gridObjects.forEach((gridObject) => {
	// 		gridObject.element.style.gridRow = `${gridObject.row}`;
	// 		gridObject.element.style.gridColumn = `${gridObject.column}`;
	// 		try {
	// 			grid.replaceChild(gridObject.element, gridObject.element);
	// 		} catch {
	// 			grid.appendChild(gridObject.element);
	// 		}
	// 	});
	// }
</script>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />

<span bind:this={slotObject} style="display: none;">
	<slot />
</span>

<div
	bind:this={grid}
	class="grid"
	style="grid-template-columns: {gridTemplateColumns}; gap: {gap}rem; padding: {gridPadding}rem;"
/>

<style lang="scss">
	.grid {
		display: inline-grid;
		display: -ms-inline-grid;
		display: -moz-inline-grid;
	}
</style>
