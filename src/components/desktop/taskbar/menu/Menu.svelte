<script lang="ts">
	import AboutMeButton from '$desktop/taskbar/menu/AboutMeButton.svelte';
	import SwitchToMobileButton from '$desktop/taskbar/menu/SwitchToMobileButton.svelte';
	import Categories from '$desktop/taskbar/menu/categories/Categories.svelte';
	import { slide } from 'svelte/transition';

	import { theme as theme_store } from '$stores/ThemeStore';
	import { Theme } from '$components/shared/Theme';
import Tooltip from '$components/desktop/Tooltip.svelte';
	let theme: Theme = Theme.Dark;
	theme_store.subscribe((new_theme: Theme) => (theme = new_theme));

	// Offset from taskbar in Rem
	export let offset: number = 0;

	export let show: boolean = false;
</script>

{#if show}
	<div
		class="menu-container {theme}"
		style="bottom: {offset}rem;"
		in:slide={{ duration: 500 }}
		out:slide={{ duration: 500 }}
	>
		<div class="about-me-button-container">
			<AboutMeButton icon="/images/icons/pfp-round.png" name="Jitze Jan Kerkstra" />
		</div>
		<Categories />

		<div class="system-buttons-container">
			<Tooltip tooltip="Mobile View">
				<SwitchToMobileButton />
			</Tooltip>
		</div>
	</div>
{/if}

<style lang="scss">
	$--menu-min-width: 30rem;

	.menu-container.theme-light {
		background-color: rgba(0, 0, 0, 0.2);
	}

	.menu-container.theme-dark {
		background-color: rgba(0, 0, 0, 0.2);
	}

	.menu-container {
		width: auto;
		min-width: $--menu-min-width;
		transition: bottom 0.25s;
		position: absolute;

		.system-buttons-container {
			width: 100%;
			display: flex;
			align-items: center;
			padding: 1rem;
		}
	}

	@media only screen and (max-width: $--menu-min-width) {
		.menu-container {
			min-width: 100%;
		}
	}
</style>
