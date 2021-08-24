<script lang="ts">
	import Tooltip from '$components/desktop/Tooltip.svelte';

	import type { Program as ProgramObject } from '$objects/shared/program/Program';

	import { hideContextMenu, showContextMenu } from '$stores/desktop/ContextMenuStore';
	import { hideMenu } from '$stores/desktop/MenuStore';
import { removeProgramShortcut } from '$stores/desktop/TaskbarStore';

	export let program: ProgramObject;
	export let row: number;
	export let height: string;

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		showContextMenu(e.clientX, e.clientY, [
			{
				name: 'Launch',
				icon: program.icon,
				onClick: () => {
					hideContextMenu();
					program.createProcess().bringToTop();
					hideMenu();
				}
			},
			{
				name: 'Unpin from taskbar',
				icon: '/images/desktop/unpin.svg',
				onClick: () => {
					hideContextMenu();
					removeProgramShortcut(program);
				}
			}
		]);
	}

	function onLauncherClick() {
		hideMenu();
		program.createProcess().bringToTop();
	}
</script>

<div style="grid-row: {row};" on:click={onLauncherClick} on:contextmenu={handleContextMenu}>
	<Tooltip tooltip={program.name} position="top">
		<button class="launcher" style="height: {height}">
			<img src={program.icon} alt={program.name} width="100%" height="auto" />
		</button>
	</Tooltip>
</div>

<style lang="scss">
	.launcher {
		background-color: rgba(0, 0, 0, 0);
		transition: background-color 0.25s;
		outline: none;
		border: none;

		cursor: pointer;

		img {
			width: 90%;
			transition: width 0.25s;
		}
	}

	.launcher:hover {
		background-color: var(--background-color-secondary-hover);

		img {
			width: 100%;
		}
	}
</style>
