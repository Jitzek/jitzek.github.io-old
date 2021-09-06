<script lang="ts">
	import { changeCursor, Cursor } from '$objects/desktop/cursors';

	import { convertRemToPixels } from '$objects/shared/conversions';

	import { dateStore, getTimeWithoutSecondsAsString } from '$stores/shared/DateTimeStore';
	import { onMount } from 'svelte';

	/** IMPORTS */
	// "svelte"
	//

	// "components"
	//

	// "objects"
	//

	// "stores"
	//

	/** ENDOF IMPORTS*/

	/** EXPORTS */
	export let heightInRem: number = 2.5;
	export let expanded: boolean = false;
	/** ENDOF EXPORTS */

	/** VARIABLE DECLARATION */
	let expanding: boolean = false;
	let statusBarElement: HTMLDivElement;
	let statusBarBorderElement: HTMLDivElement;
	let innerHeight: number;
	let statusBarOffset: number = 0;
	let isResizing: boolean = false;
	let minY: number = 0;
	let maxY: number = 0;
	let deltaY: number = 0;
	/** ENDOF VARIABLE DECLERATION */

	/** STORE CALLBACKS */
	//
	/** ENDOF STORE CALLBACKS */

	/** REACTIVE VARIABLES */
	$: {
		maxY = innerHeight - convertRemToPixels(heightInRem);
		if (statusBarOffset >= maxY) statusBarOffset = maxY;
	}
	$: {
		expanded;
		if (!isResizing) expanded ? expandStatusBar(true) : collapseStatusBar(true);
	}
	$: {
		innerHeight;
		if (!isResizing) expanded ? expandStatusBar(false) : collapseStatusBar(false);
	}
	/** ENDOF REACTIVE VARIABLES */

	/** HELPER FUNCTIONS */
	function expandStatusBar(smoothly: boolean = true) {
		statusBarOffset = maxY;
		if (!smoothly) return;
		expanding = true;
		setTimeout(() => {
			expanding = false;
		}, 500);
	}
	function collapseStatusBar(smoothly: boolean = true) {
		statusBarOffset = minY;
		if (!smoothly) return;
		expanding = true;
		setTimeout(() => {
			expanding = false;
		}, 500);
	}
	/** ENDOF HELPER FUNCTIONS */

	/** EVENT HANDLERS */
	function handleStatusBarBorderMoveStart(y: number) {
		isResizing = true;
		changeCursor(Cursor.GRABBING);
		statusBarBorderElement.style.cursor = Cursor.GRABBING;
	}
	function handleStatusBarBorderMove(y: number) {
		if (!isResizing) return;
		deltaY = statusBarOffset - y;
		statusBarOffset = y;
		if (statusBarOffset <= minY) statusBarOffset = minY;
		else if (statusBarOffset >= maxY) statusBarOffset = maxY;
	}
	function handleStatusBarMoveBorderEnd(y: number) {
		if (!isResizing) return;
		changeCursor(Cursor.AUTO);
		statusBarBorderElement.style.cursor = Cursor.GRAB;
		isResizing = false;
		// Check if the statusbar should be locked as expanded or folded
		// If the acceleration of the status bar is going up and exceeding a predetermined number
		if (deltaY >= 2) {
			expanded = false;
		}
		// If the acceleration of the status bar is going down and exceeding a predetermined number
		else if (deltaY <= -2) {
			expanded = true;
		}
		// If the status bar halfway (or more) collapsed
		else if (statusBarOffset <= (maxY - minY) / 2) {
			expanded = false;
		}
		// If the status bar halfway (or more) expanded
		else if (statusBarOffset >= (maxY - minY) / 2) {
			expanded = true;
		}
	}
	function window_handleTouchMove(e: TouchEvent) {
		if (!isResizing) return;
		e.preventDefault();
		handleStatusBarBorderMove(e.targetTouches[0].clientY);
	}
	function window_handleTouchEnd(e: TouchEvent) {
		if (!isResizing) return;
		e.preventDefault();
		handleStatusBarMoveBorderEnd(e.changedTouches[0].clientY);
	}
	function window_handleMouseMove(e: MouseEvent) {
		if (!isResizing) return;
		e.preventDefault();
		handleStatusBarBorderMove(e.clientY);
	}
	function window_handleMouseUp(e: MouseEvent) {
		if (!isResizing) return;
		e.preventDefault();
		handleStatusBarMoveBorderEnd(e.clientY);
	}

	function handleStatusBarBorderTouchStart(e: TouchEvent) {
		handleStatusBarBorderMoveStart(e.targetTouches[0].clientY);
	}
	function handleStatusBarBorderMouseDown(e: MouseEvent) {
		handleStatusBarBorderMoveStart(e.clientY);
	}
	/** ENDOF EVENT HANDLERS */
</script>

<svelte:window
	bind:innerHeight
	on:touchmove={window_handleTouchMove}
	on:touchend={window_handleTouchEnd}
	on:mousemove={window_handleMouseMove}
	on:mouseup={window_handleMouseUp}
/>

<div
	bind:this={statusBarElement}
	class:expanding
	class="status-bar"
	style="top: {statusBarOffset - maxY + convertRemToPixels(heightInRem)}px"
>
	<div class="status-bar-content" style="height: {maxY}px;">
		Top<br />
		Content<br />
		Content<br />
		Content<br />
		Content<br />
		Content<br />
		Content<br />
		Content<br />
		Content<br />
		Content<br />
		Bottom<br />
	</div>
</div>
<div class="status-bar-status" style="height: {heightInRem}rem;">
	<div class="status-bar-status-left">
		{getTimeWithoutSecondsAsString($dateStore)}
	</div>
	<div class="status-bar-status-right">right</div>
</div>
<div
	bind:this={statusBarBorderElement}
	class:expanding
	class:expanded
	class:isResizing
	class="status-bar-border"
	style="height: {heightInRem}rem; top: {statusBarOffset}px"
	on:touchstart={handleStatusBarBorderTouchStart}
	on:mousedown={handleStatusBarBorderMouseDown}
	on:contextmenu={(e) => e.preventDefault()}
/>

<style lang="scss">
	.status-bar {
		position: fixed;
		width: 100%;
		height: 100%;

		.status-bar-content {
			position: absolute;
			width: 100%;
			overflow: auto;
			background-color: var(--background-color);
		}
	}

	.status-bar-border {
		cursor: grab;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		background-color: transparent;

		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
	}

	.status-bar.expanding {
		transition: top 0.5s;
	}
	.status-bar-border.expanding {
		transition: top 0.5s;
		background-color: var(--background-color-secondary);
	}
	.status-bar-border.expanded {
		background-color: var(--background-color-secondary);
	}
	.status-bar-border.isResizing {
		background-color: var(--background-color-secondary);
	}

	.status-bar-status {
		position: fixed;
		display: flex;
		align-items: center;
		top: 0;
		background-color: var(--background-color-secondary);
		width: 100%;

		.status-bar-status-left {
			position: absolute;
			left: 0;
			margin-left: 0.5rem;
		}
		.status-bar-status-right {
			position: absolute;
			right: 0;
			margin-right: 0.5rem;
		}
	}
</style>
