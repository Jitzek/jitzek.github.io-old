<script lang="ts">
	export let src: string;
	export let title: string = 'Navigation';
	export let font: string = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";
</script>

<button class="menuButton" on:click>
	<figure>
		<img {src} alt="Navigation Menu" width="80%" height="auto" />
	</figure>
	<p style="font-family: {font}">{title}</p>
</button>

<style lang="scss">
	.menuButton {
		background-color: rgba(0, 0, 0, 0);
		transition: background-color 0.2s;
		outline: none;
		border: none;

		display: flex;
		justify-content: center;
		align-items: center;
		figure {
			margin: 0;
			width: 100%;
			height: 100%;
		}

		p {
			color: #e6e7e8;
			margin-right: 8px;
		}
	}

	.menuButton:hover {
		background-color: rgba(0, 0, 0, 0.2);
		cursor: pointer;
	}
</style>
