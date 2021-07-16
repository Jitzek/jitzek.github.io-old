<script lang="ts">
	import { setup as setupWindowQueries } from '$stores/DeviceTypeStore';
	import { onMount } from 'svelte';

	import { theme as theme_store } from '$stores/ThemeStore';
	import type { Theme } from '$shared/Theme';
	let theme: Theme = $theme_store;
	theme_store.subscribe((new_theme) => (theme = new_theme));

	import { font as font_store } from '$stores/FontStore';
	import { Font } from '$shared/Font';
	let font: Font = Font.Default;
	font_store.subscribe((new_font) => (font = new_font));

	onMount(() => {
		// Function should be called within the onMount function since it requires window to be assigned
		setupWindowQueries({ desktopQuery: 'screen and (min-width: 768px)', listen: true });

		$: {
			theme;
			document.body.classList.toggle(theme);
		}
		$: {
			font;
			document.body.style.fontFamily = font;
		}

		// Disable image dragging
		// This could have potential unwanted side effects
		document.body.ondragstart = () => {
			return false;
		};
	});
</script>

<slot />

<style lang="scss">
	:global(body.theme-dark) {
		color: #e6e7e8;
		background-color: #4d555b;
	}

	:global(body.theme-light) {
		color: #e6e7e8;
		background-color: #9dafbd;
	}

	:global(html) :global(body) {
		margin: 0;
		height: 100%;

		-moz-user-select: none;
		-webkit-user-select: none;
		user-select: none;

		user-drag: none;
		-webkit-user-drag: none;
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}
</style>
