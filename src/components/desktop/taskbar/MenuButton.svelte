<script lang="ts">
	export let src: string;
	export let title: string = 'Navigation';
    export let font: string = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";
</script>

<div class="menuButton">
	<figure>
		<img {src} alt="Navigation Menu" width="80%" height="auto" />
	</figure>
	<p style="font-family: {font}">{title}</p>
</div>

<style lang="scss">
	.menuButton {
		display: flex;
		justify-content: center;
		align-items: center;
		figure {
			margin: 0;
            margin-right: -8px;
			width: 100%;
			height: 100%;
		}

		p {
            color: #E6E7E8;
			margin-right: 8px;
		}
	}
</style>
