<script lang="ts">
	/** IMPORTS */
	// "svelte"
	//

	// "components"
	//

	// "objects"
	//

	// "stores"
	import { showMenuStore, toggleMenu } from "$stores/desktop/MenuStore";
	//

	/** ENDOF IMPORTS*/

    /** EXPORTS */
	export let title: string = 'Start Menu';
	export let activated: boolean = false;
    /** ENDOF EXPORTS */

	/** VARIABLE DECLARATION */
    //
	/** ENDOF VARIABLE DECLERATION */

    /** STORE CALLBACKS */
	showMenuStore.subscribe(_showMenu => activated = _showMenu);
    /** ENDOF STORE CALLBACKS */

    /** REACTIVE VARIABLES */
    //
    /** ENDOF REACTIVE VARIABLES */

    /** HELPER FUNCTIONS */
    //
    /** ENDOF HELPER FUNCTIONS */

    /** EVENT HANDLERS */
	function handleMenuButtonClick(_e: MouseEvent) {
		toggleMenu();
	} 
    /** ENDOF EVENT HANDLERS */
</script>

<button class:activated class="menu-button" on:click={handleMenuButtonClick}>
	<div class="menu-button-content">
		<div class="menu-button-icon">
			<slot />
		</div>
		<p>{title}</p>
	</div>
</button>

<style lang="scss">
	.menu-button {
		background-color: rgba(0, 0, 0, 0);
		transition: background-color 0.2s;
		outline: none;
		border: none;

		display: flex;
		justify-content: center;
		align-items: center;

		height: 100%;
		width: 12rem;

		color: inherit;
		font-family: inherit;
		font-size: inherit;

		.menu-button-content {
			display: flex;
			text-align: center;
			justify-content: center;
			align-items: center;

			max-height: 100%;
			.menu-button-icon {
				display: inline;
				margin: 0;
				width: 3rem;
				height: auto;
				margin-right: 8px;

				transition: width 0.25s;
			}

			p {
				/**
				 TODO:
				 Set globally
				*/
				// font-size: 1rem;
				// color: #e6e7e8;
				// font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
				margin-right: 8px;
			}
		}
	}

	.menu-button:hover, .menu-button.activated {
		background-color: var(--background-color-secondary-hover);
		cursor: pointer;

		.menu-button-icon {
			width: 3.25rem;
		}
	}
</style>
