<script lang="ts">
	/** IMPORTS */
	// "svelte"
	//

	// "components"
	//

	// "objects"
	import type { Program as ProgramObject } from '$objects/shared/program/Program';
	//

	// "stores"
	import { hideContextMenu, showContextMenu } from '$stores/desktop/ContextMenuStore';
	import { hideMenu } from '$stores/desktop/MenuStore';
	import {
		addProgramShortcut,
		containsProgramShortcut,
		removeProgramShortcut
	} from '$stores/desktop/TaskbarStore';
	//

	/** ENDOF IMPORTS*/

	/** EXPORTS */
	export let program: ProgramObject;
	export let activated: boolean = false;
	/** ENDOF EXPORTS */

	/** VARIABLE DECLARATION */
	//
	/** ENDOF VARIABLE DECLERATION */

	/** STORE CALLBACKS */
	//
	/** ENDOF STORE CALLBACKS */

	/** REACTIVE VARIABLES */
	//
	/** ENDOF REACTIVE VARIABLES */

	/** HELPER FUNCTIONS */
	//
	/** ENDOF HELPER FUNCTIONS */

	/** EVENT HANDLERS */
	function handleMenuLauncherButtonContextMenu(e: MouseEvent) {
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
				name: containsProgramShortcut(program) ? 'Unpin from taskbar' : 'Pin to taskbar',
				icon: containsProgramShortcut(program)
					? '/images/desktop/unpin.svg'
					: '/images/desktop/pin.svg',
				onClick: () => {
					hideContextMenu();
					containsProgramShortcut(program)
						? removeProgramShortcut(program)
						: addProgramShortcut(program);
				}
			}
		]);
	}

	function handleMenuLauncherButtonClick() {
		program.createProcess().bringToTop();
		hideMenu();
	}

	function handleMenuLauncherButtonDragStart(e: DragEvent) {
		e.dataTransfer.setData('program_id', program.id.toString());
	}
	/** ENDOF EVENT HANDLERS */
</script>

<button
	class:activated
	class="menu-launcher-button"
	on:click={handleMenuLauncherButtonClick}
	on:contextmenu={handleMenuLauncherButtonContextMenu}
	draggable={true}
	on:dragstart={handleMenuLauncherButtonDragStart}
>
	<div class="menu-launcher-button-content">
		<img src={program.icon} alt={program.name} />
		<div class="name-and-description">
			<span class="name">{program.name}</span>
			{#if program.description}
				<br />
				<span class="description">{program.description}</span>
			{/if}
		</div>
	</div>
</button>

<style lang="scss">
	.menu-launcher-button {
		background-color: rgba(0, 0, 0, 0);
		transition: background-color 0.25s;

		display: block;
		outline: none;
		border: none;

		color: inherit;
		font-family: inherit;
		font-size: inherit;

		cursor: pointer;

		width: 100%;
		height: 3.25rem;

		.menu-launcher-button-content {
			display: flex;
			height: 100%;
			align-items: center;
			overflow: hidden;

			img {
				display: inline;
				margin: 0;
				margin-right: 8px;
				width: 2.5rem;
				transition: width 0.25s;
				height: auto;
			}

			.name-and-description {
				display: inline-block;
				text-align: left;
				color: var(--font-color);

				.description {
					color: var(--font-color-secondary);
				}
			}
		}
	}

	.menu-launcher-button:hover,
	.menu-launcher-button.activated {
		background-color: var(--background-color-secondary-hover);
	}

	.menu-launcher-button:hover,
	.menu-launcher-button.activated {
		img {
			width: 2.75rem;
		}
	}
</style>
