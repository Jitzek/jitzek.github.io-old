<script lang="ts">
	export let src: string;
	export let title: string = 'Navigation';
	export let font: string = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";
</script>

<button class="menu-button" on:click>
	<div class="menu-button-content">
		<figure>
			<img {src} alt="Navigation Menu" width="auto" height="auto" />
		</figure>
		<span style="font-family: {font}">{title}</span>
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

		.menu-button-content {
			display: flex;
			text-align: center;
			justify-content: center;
			align-items: center;
			figure {
				display: inline;
				margin: 0;
				width: 100%;
				height: 100%;
			}

			span {
				color: #e6e7e8;
				margin-right: 8px;
			}
		}
	}

	.menu-button:hover {
		background-color: rgba(0, 0, 0, 0.2);
		cursor: pointer;
	}
</style>
