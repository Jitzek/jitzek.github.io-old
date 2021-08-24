<script lang="ts">
	import { setup as setupWindowQueries } from '$stores/shared/DeviceTypeStore';
	import { onMount } from 'svelte';

	import { theme as theme_store } from '$stores/shared/ThemeStore';
	import { Theme } from '$objects/shared/Theme';
	theme_store.set(Theme.Dark);

	import { font as font_store } from '$stores/shared/FontStore';
	import { Font } from '$objects/shared/Font';
	let font: Font;
	font_store.subscribe((new_font) => (font = new_font));
	font_store.set(Font.Default);

	let wrapper: HTMLDivElement;
	onMount(() => {
		// Function should be called within the onMount function since it requires window to be assigned
		setupWindowQueries({ desktopQuery: 'screen and (min-width: 768px)', listen: true });

		theme_store.subscribe((new_theme) => {
			document.documentElement.setAttribute('data-theme', new_theme);
		});
	});
</script>

<div bind:this="{wrapper}" style="font-family: {font}">
	<slot />
</div>

<style lang="scss">
	:global(html[data-theme='dark']) {
		--font-color: #eeeeee;
		--font-color-secondary: #bbbbbb;

		--background-color:  hsl(0, 0%, 20%);
		--background-color-hover: rgba(0, 0, 0, 0.2);

		--background-color-secondary: hsl(0, 0%, 13%);
		--background-color-secondary-hover: rgba(0, 0, 0, 0.35);

		--background-color-application: hsl(0, 0%, 17%);
		--border-color-application: hsl(0, 0%, 30%);

		--heading-color: #818cab;

		--accent-neutral-color: rgb(25%,65%,95%);
		--accent-alert-color: hsla(0, 55%, 55%, 1);
	}

	:global(html[data-theme='light']) {
		--font-color: #222222;
		--font-color-secondary: #3f3f3f;

		--background-color: hsl(180, 15%, 80%);
		--background-color-hover: rgba(0, 0, 0, 0.2);

		--background-color-secondary: hsl(200, 25%, 73%);
		--background-color-secondary-hover: rgba(255, 255, 255, 0.35);

		--background-color-application: hsl(200, 10%, 80%);
		--border-color-application: hsl(200, 10%, 50%);

		--heading-color: #333333;

		--accent-neutral-color: rgb(0%,40%,100%);
		--accent-alert-color: hsla(0, 85%, 65%, 1);
	}

	:global(html) :global(body) {
		margin: 0;
		height: 100%;

		color: var(--font-color);
		background-color: var(--background-color);

		font-weight: 500;
	}
</style>
