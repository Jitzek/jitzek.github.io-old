<script lang="ts">
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
	export let tooltip: string = '';
	/**
	 * "top", "bottom", "left" or "right"
	 */
	export let position: string = 'top';
	export let width: string = 'max-content';
    /** ENDOF EXPORTS */

	/** VARIABLE DECLARATION */
	let tooltipElement: HTMLDivElement;
	/** ENDOF VARIABLE DECLERATION */

    /** STORE CALLBACKS */
	//
    /** ENDOF STORE CALLBACKS */

    /** REACTIVE VARIABLES */
    //
    /** ENDOF REACTIVE VARIABLES */

    /** HELPER FUNCTIONS */
    //
    /** ENDOF HELPER FUNCTIONS */

    /** EVENT HANDLERS */
    //
    /** ENDOF EVENT HANDLERS */
</script>

<div
	bind:this={tooltipElement}
	class="tooltip {position}"
	data-tooltip={tooltip}
	style="--width: {width};"
	on:mouseover={() => (tooltipElement.style.zIndex = '9')}
	on:mouseleave={() => (tooltipElement.style.zIndex = 'initial')}
>
	<slot />
</div>

<style>
	.tooltip[data-tooltip]:before{
		background-color: var(--background-color);
		color: var(--font-color);

		box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
	}

	.tooltip[data-tooltip]:after {
		border-top: 5px solid var(--background-color);
		border-bottom: 5px solid var(--background-color);
	}

	[data-tooltip] {
		position: relative;
		z-index: 2;
		display: block;
	}

	[data-tooltip]:before,
	[data-tooltip]:after {
		visibility: hidden;
		opacity: 0;
		pointer-events: none;
		transition: 0.2s ease-out;
		transform: translate(-50%, 5px);
	}

	.tooltip.top[data-tooltip]:before {
		bottom: 100%;
		left: 50%;
		margin-bottom: 5px;
	}

	.tooltip.bottom[data-tooltip]:before {
		top: 100%;
		left: 50%;
		margin-top: 5px;
	}

	.tooltip.left[data-tooltip]:before {
		top: 0;
		right: 45%;
	}

	.tooltip.right[data-tooltip]:before {
		top: 0;
		left: 175%;
	}

	[data-tooltip]:before {
		position: absolute;
		/* bottom: 100%; */
		/* left: 50%; */
		/* margin-bottom: 5px; */
		padding: 7px;
		width: var(--width);
		-webkit-border-radius: 3px;
		-moz-border-radius: 3px;
		border-radius: 3px;

		content: attr(data-tooltip);
		text-align: center;
		font-size: 14px;
		line-height: 1.2;
		transition: 0.2s ease-out;
	}

	.tooltip.top[data-tooltip]:after {
		bottom: 100%;
		left: 50%;
		border-bottom: transparent;
	}

	.tooltip.bottom[data-tooltip]:after {
		top: 100%;
		left: 50%;
		border-top: transparent;
	}

	.tooltip.left[data-tooltip]:after {
		top: 50%;
		right: 95%;
		border-top: transparent;
		transform: rotate(90deg);
		-webkit-transform: rotate(90deg);
		-moz-transform: rotate(90deg);
	}

	.tooltip.right[data-tooltip]:after {
		top: 50%;
		left: 95%;
		border-bottom: transparent;
		transform: rotate(90deg);
		-webkit-transform: rotate(90deg);
		-moz-transform: rotate(90deg);
	}

	[data-tooltip]:after {
		position: absolute;
		/* bottom: 100%; */
		/* left: 50%; */
		width: 0;
		/* border-top: 5px solid #000; */
		/* border-top: 5px solid hsla(0, 0%, 20%, 0.9); */
		border-right: 5px solid transparent;
		border-left: 5px solid transparent;
		content: ' ';
		font-size: 0;
		line-height: 0;
	}

	[data-tooltip]:hover:before,
	[data-tooltip]:hover:after {
		visibility: visible;
		opacity: 1;
		transform: translate(-50%, 0);
	}
	[data-tooltip='false']:hover:before,
	[data-tooltip='false']:hover:after {
		visibility: hidden;
		opacity: 0;
	}
</style>
