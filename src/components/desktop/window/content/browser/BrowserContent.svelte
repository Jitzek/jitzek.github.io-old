<script lang="ts">
	/** IMPORTS */
	// "svelte"
	import { onMount } from 'svelte';
	//

	// "components"
	import RefreshButton from '$components/desktop/window/content/browser/RefreshButton.svelte';
	import Address from '$components/desktop/window/content/browser/Address.svelte';
	//

	// "objects"
	//

	// "stores"
	//

	/** ENDOF IMPORTS*/

    /** EXPORTS */
	export let url: string;
	export let title: string;
	export let onSelection: Function = () => {};
    /** ENDOF EXPORTS */

	/** VARIABLE DECLARATION */
	let iframeElement: HTMLIFrameElement;

	let onSelectionSpamPrevention: boolean = false;

	onMount(() => {
		// Detect onClick within iframe element
		// TODO: Find a more elegant solution
		setInterval(() => {
			if (document.activeElement === iframeElement) {
				if (!onSelectionSpamPrevention) onSelection();
				onSelectionSpamPrevention = true;
			} else onSelectionSpamPrevention = false;
		}, 100);
	});
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

<div class="web-page">
	<div class="address-bar">
		<RefreshButton onClick={() => (iframeElement.src += '')} />
		<div class="address-container">
			<Address address={url} />
		</div>
	</div>
	<iframe bind:this={iframeElement} src={url} {title} allow="fullscreen" id="iframe" />
</div>

<style lang="scss">
	.web-page {
		$--address-bar-height: 2rem;

		width: 100%;
		height: 100%;

		.address-bar {
			display: flex;
			align-items: center;
			width: 100%;
			height: $--address-bar-height;

			.address-container {
				display: flex;
				justify-content: center;
				width: 100%;
			}
		}

		iframe {
			all: unset;
			width: 100%;
			height: calc(100% - #{$--address-bar-height});
		}
	}
</style>
