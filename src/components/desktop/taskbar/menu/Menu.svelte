<script lang="ts">
	import AboutMeButton from '$desktop/taskbar/menu/AboutMeButton.svelte';
	import Categories from '$desktop/taskbar/menu/categories/Categories.svelte';

	export let backgroundColor: string = 'rgba(0, 0, 0, 0.2)';
	// Offset from taskbar
	export let offset: string = '0';

	export let show: boolean = false;
</script>

<div
	class:show
	class="menu-container"
	style="bottom: {offset}; background-color: {backgroundColor};"
>
	<div class="about-me-button-container">
		<AboutMeButton icon="/images/icons/pfp-round.png" name="Jitze Jan Kerkstra" />
	</div>
	<Categories />
</div>

<style lang="scss">
	$--min-menu-width: 25rem;

	.menu-container {
		width: auto;
		min-width: $--min-menu-width;
		opacity: 0;
		transition: opacity 0.25s, bottom 0.25s;
		position: absolute;
	}
	.menu-container.show {
		opacity: 100;
		position: absolute;
	}

	@media only screen and (max-width: $--min-menu-width)
	{
		.menu-container {
			min-width: 100%;
		}
	}
</style>
