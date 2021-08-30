<script lang="ts">
	import type { Program } from "$objects/shared/program/Program";
	import { hideContextMenu, showContextMenu } from "$stores/desktop/ContextMenuStore";
	import { removeGridItem } from "$stores/shared/GridStore";
		
	export let id: number;
	export let program: Program;

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		showContextMenu(e.clientX, e.clientY, [
			{
				name: 'Launch',
				icon: program.icon,
				onClick: () => {
					hideContextMenu();
					program.createProcess().bringToTop();
				}
			},
			{
				name: 'Remove Desktop Shortcut',
				icon: null,
				onClick: () => {
					hideContextMenu();
					removeGridItem(id);
				}
			}
		]);
	}
</script>

<div class="program" on:contextmenu={handleContextMenu}>
	<div class="image-container">
		<img src={program.icon} alt={program.name} draggable="false" />
	</div>
	<p>{program.name}</p>
</div>

<style lang="scss">
	.program {
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;

		.image-container {
			width: 100%;
			height: 100%;
			img {
				width: 65%;
			}
		}
		p {
			margin: 0;
			color: #eeeeee;
			text-shadow: 0px 1px 2px black;

			width: 100%;
			word-wrap: break-word;
		}
	}
</style>
