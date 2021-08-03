<script lang="ts">
	import AboutMeButton from '$desktop/taskbar/menu/AboutMeButton.svelte';
	import SwitchToMobileButton from '$components/desktop/taskbar/menu/global_options/SwitchToMobileButton.svelte';
	import ChangeThemeSwitch from '$components/desktop/taskbar/menu/global_options/ChangeThemeSwitch.svelte';
	import Categories from '$desktop/taskbar/menu/categories/Categories.svelte';
	import { slide } from 'svelte/transition';

	import { theme as theme_store } from '$stores/shared/ThemeStore';
	import { Theme } from '$components/shared/Theme';
	import Tooltip from '$components/desktop/Tooltip.svelte';
	let theme: Theme = Theme.Dark;
	theme_store.subscribe((new_theme: Theme) => {
		theme = new_theme;
	});

	// Offset from taskbar in Rem
	export let offset: number = 0;

	export let show: boolean = false;
</script>

{#if show}
	<div
		class="menu-container {theme}"
		style="bottom: {offset}rem; --offset: {offset}rem;"
		in:slide={{ duration: 500 }}
		out:slide={{ duration: 500 }}
	>
		<div class="menu-container-top">
			<div class="about-me-button-container">
				<AboutMeButton icon="/images/icons/pfp-round.png" name="Jitze Jan Kerkstra" />
			</div>
			<div class="system-buttons-container">
				<Tooltip tooltip="Toggle Mobile View" position="bottom" width="4.5rem">
					<SwitchToMobileButton />
				</Tooltip>
				<div style="padding-left: 0.75rem;" />
				<Tooltip
					tooltip="Toggle {theme == Theme.Dark ? 'Light' : 'Dark'} mode"
					position="bottom"
					width="4.35rem"
				>
					<ChangeThemeSwitch />
				</Tooltip>
			</div>
		</div>
		<Categories />
	</div>
{/if}

<style lang="scss">
	$--menu-min-width: 40rem;

	.menu-container {
		// background-color: rgba(0, 0, 0, 0.2);
		background-color: var(--background-color-secondary);

		min-width: $--menu-min-width;
		width: fit-content;
		transition: bottom 0.25s;
		position: absolute;

		max-height: calc(100vh - var(--offset));

		overflow-y: auto;

		.menu-container-top {
			display: flex;
			padding-bottom: 1rem;
			.about-me-button-container {
				flex: 3;
			}

			.system-buttons-container {
				display: flex;
				align-items: center;
				padding: 1rem;
				flex: 1;
			}
		}
	}

	@media only screen and (max-width: $--menu-min-width) {
		.menu-container {
			min-width: 100%;
		}
	}

	@media only screen and (max-width: 300px) {
		.menu-container {
			.menu-container-top {
				// Make sure the button to switch to mobile is still visible
				display: inline-block;
			}
		}
	}
</style>
