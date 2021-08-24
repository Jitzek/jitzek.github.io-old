<script lang="ts">
	import { clickOutside } from '$components/shared/events/mouseOutside';

	import { hideContextMenu } from '$stores/desktop/ContextMenuStore';

	export let x: number;
	export let y: number;
	export let z_index: number;

	let innerWidth: number;
	let innerHeight: number;

	let contextMenuElement: HTMLElement;

	$: {
		[innerWidth, innerHeight, contextMenuElement];
		if (contextMenuElement) {
			contextMenuElement.style.left = `${innerWidth / 2 < x ? x - contextMenuElement.offsetWidth : x}px`;
			contextMenuElement.style.top = `${innerHeight / 2 < y ? y - contextMenuElement.offsetHeight : y}px`;
		}
	}

	function onClickOutside(e) {
		hideContextMenu();
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div
	bind:this={contextMenuElement}
	class="context-menu"
	style="z-index: {z_index};"
	use:clickOutside
	on:clickoutside={(e) => onClickOutside(e)}
>
	<slot name="options" />
</div>

<style lang="scss">
	.context-menu {
		position: absolute;
		background-color: var(--background-color);
		height: auto;
		width: auto;
		max-width: 100%;
		max-height: 100%;
		outline: 1px solid var(--font-color-secondary);
	}
</style>
