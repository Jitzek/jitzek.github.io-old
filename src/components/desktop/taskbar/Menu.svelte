<script lang="ts">
	export let backgroundColor: string = '#3E454A';
	// Offset from taskbar
	export let offset: string = '0';

	export let show: boolean = false;
</script>

<div class:show class="menu-container" style="top: -{offset}">
	<h1>Menu</h1>
</div>

<style lang="scss">

	.menu-container {
        opacity: 0;
        transition: opacity 0.2s;
		position: absolute;
	}
    .menu-container.show {
        opacity: 100;
		position: absolute;
	}
</style>
