<script lang="ts">
	import { clickOutside } from '$components/shared/events/mouseOutside';
    
    import { hideContextMenu } from '$stores/desktop/ContextMenuStore';

	export let x: number;
	export let y: number;
	export let z_index: number;

    function onClickOutside(e) {
        hideContextMenu();
    }
</script>

<div
	class="context-menu"
	style="left: {x}px; top: {y}px; z-index: {z_index};"
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
		outline: 1px solid var(--font-color-secondary);
	}
</style>
