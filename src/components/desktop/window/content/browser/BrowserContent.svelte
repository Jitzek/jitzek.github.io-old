<script lang="ts">
	import RefreshButton from '$components/desktop/window/content/browser/RefreshButton.svelte';
	import Address from '$components/desktop/window/content/browser/Address.svelte';
	import { onMount } from 'svelte';

	export let url: string;
	export let title: string;
	export let onSelection: Function = () => {};

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
