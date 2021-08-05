<script lang="ts">
	import Tooltip from '$components/desktop/Tooltip.svelte';

	export let name: string;
	export let icon: string;
	export let alt: string = 'launcher';
	export let row: number;
	export let height: string;
	export let onClick: Function = () => {};

	function onLauncherClick() {
		onClick();
	}
</script>

<div style="grid-row: {row};" on:click={onLauncherClick}>
	<Tooltip tooltip={name} position="top">
		<button class="launcher" style="height: {height}">
			<img src={icon} {alt} width="100%" height="auto" />
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
