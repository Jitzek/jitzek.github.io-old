<script lang="ts">
	/** IMPORTS */
	// "svelte"
	//

	// "components"
	//

	// "objects"
	//

	// "stores"
	//

	/** ENDOF IMPORTS*/

    /** EXPORTS */
	export let name: string;
	export let icon: string | null = null;
	export let onClick: Function = () => {};
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
    //
    /** ENDOF EVENT HANDLERS */
</script>

<button class="context-menu-option" on:click={onClick()}>
	<div class="icon-container">
		{#if icon}
			<img src={icon} alt={name} />
		{/if}
	</div>
	<span>{name}</span>
</button>

<style lang="scss">
	button {
		all: unset;
		background-color: rgba(0, 0, 0, 0);
		width: 100%;
		height: 2.5rem;
		cursor: pointer;
		font-family: inherit;
		display: flex;
		align-items: center;

		.icon-container {
			padding-left: 0.5rem;
			height: 100%;
			width: 2rem;
			display: flex;
			align-items: center;
			
			img {
				height: 65%;
				width: auto;
			}
		}

		span {
			padding: 0 1.5rem 0 0.5rem;
		}
	}

	button:hover {
		background-color: var(--background-color-hover);
	}
</style>
