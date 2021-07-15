<script lang="ts">
    import Wallpaper from "$components/shared/Wallpaper.svelte";
    import Taskbar from "$components/desktop/taskbar/Taskbar.svelte";

    let wallpaper: string = "/static/images/wallpapers/custom-design-01-1280x720.png";
</script>

<Wallpaper src="{wallpaper}" />
<Taskbar />

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
</style>
