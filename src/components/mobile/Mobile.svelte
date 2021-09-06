<script lang="ts">
	/** IMPORTS */
	// "svelte"
	//

	// "components"
	import Grid from '$components/shared/grid/Grid.svelte';
	import Wallpaper from '$components/shared/Wallpaper.svelte';
	import StatusBar from '$components/mobile/status_bar/StatusBar.svelte';
	//

	// "objects"
	//

	// "stores"
	//

	/** ENDOF IMPORTS*/

	/** EXPORTS */
	//
	/** ENDOF EXPORTS */

	/** VARIABLE DECLARATION */
	let wallpaper: string = '/images/wallpapers/custom-design-01-1280x720.png';
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

<svelte:head>
	<title>Jitze Jan Kerkstra</title>
</svelte:head>

<div class="grid-container">
	<Grid topOffset={2.5} columnWidth={5} columnHeight={6} gap={1.5} padding={1} />
</div>

<StatusBar heightInRem={2.5} />

<style lang="scss">
	.grid-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>
