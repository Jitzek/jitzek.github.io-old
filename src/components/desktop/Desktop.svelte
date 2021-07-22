<script lang="ts">
	import Wallpaper from '$components/shared/Wallpaper.svelte';
	import Taskbar from '$components/desktop/taskbar/Taskbar.svelte';
	import Program from '$components/desktop/Program.svelte';
	import { convertRemToPixels } from '$components/shared/conversions';
	import Grid from '$components/shared/grid/Grid.svelte';
	import GridObject from '$components/shared/grid/GridObject.svelte';

	let wallpaper: string = '/images/wallpapers/custom-design-01-1280x720.png';

	let taskbarHeight: number;
</script>

<Wallpaper src={wallpaper} />
<Grid heightOffset={taskbarHeight} columnWidth={4.5} columnHeight={5}>
	<GridObject row={1} column={1}>
		<Program icon="/images/icons/utilities-terminal.svg" name="terminal111" />
	</GridObject>
	<GridObject row={1} column={2}>
		<Program icon="/images/icons/utilities-terminal.svg" name="terminal 2" />
	</GridObject>
	<GridObject row={2} column={1}>
		<Program icon="/images/icons/utilities-terminal.svg" name="terminal 3" />
	</GridObject>
</Grid>
<Taskbar bind:height={taskbarHeight} />

<style lang="scss">
	/*
    :global(html) {
		background-color: #4d555b;
		background: url('/static/images/custom-design-01-1920x1080.png') no-repeat center center fixed;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		background-size: cover;
	}
    */

	.desktop-grid {
		padding: 1rem;

		display: inline-grid;
		display: -ms-inline-grid;
		display: -moz-inline-grid;

		gap: 2.5rem;
	}
</style>
