<script lang="ts">
	/** IMPORTS */
	// "svelte"
	//

	// "components"
	import { clickOutside } from '$components/shared/events/mouseOutside';
	//

	// "objects"
	//

	// "stores"
	import { hideContextMenu } from '$stores/desktop/ContextMenuStore';
	//

	/** ENDOF IMPORTS*/

    /** EXPORTS */
	export let x: number;
	export let y: number;
	export let z_index: number;
    /** ENDOF EXPORTS */

	/** VARIABLE DECLARATION */
	let innerWidth: number;
	let innerHeight: number;

	let contextMenuElement: HTMLElement;
	/** ENDOF VARIABLE DECLERATION */

    /** STORE CALLBACKS */
    //
    /** ENDOF STORE CALLBACKS */

    /** REACTIVE VARIABLES */
	$: {
		[innerWidth, innerHeight, contextMenuElement];
		if (contextMenuElement) {
			contextMenuElement.style.left = `${innerWidth / 2 < x ? x - contextMenuElement.offsetWidth : x}px`;
			contextMenuElement.style.top = `${innerHeight / 2 < y ? y - contextMenuElement.offsetHeight : y}px`;
		}
	}
    /** ENDOF REACTIVE VARIABLES */

    /** HELPER FUNCTIONS */
    //
    /** ENDOF HELPER FUNCTIONS */

    /** EVENT HANDLERS */
	function handleClickOutside(e) {
		hideContextMenu();
	}
    /** ENDOF EVENT HANDLERS */


</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div
	bind:this={contextMenuElement}
	class="context-menu"
	style="z-index: {z_index};"
	use:clickOutside
	on:clickoutside={(e) => handleClickOutside(e)}
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
