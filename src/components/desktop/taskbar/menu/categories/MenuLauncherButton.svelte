<script lang="ts">
	export let icon: string;
	export let name: string;
	export let alt: string = 'Category Button';
	export let activated: boolean = false;
</script>

<button class:activated class="category-button" on:click>
	<div class="category-button-content">
		<img src={icon} {alt} />
		{name}
	</div>
</button>

<style lang="scss">
	.category-button {
		background-color: rgba(0, 0, 0, 0);
		display: block;
		outline: none;
		border: none;

		color: inherit;
		font-family: inherit;
		font-size: inherit;

		cursor: pointer;

        width: 100%;

		.category-button-content {
			display: flex;
			align-items: center;

			max-height: 100px;

			img {
				display: inline;
				margin: 0;
				margin-right: 8px;
				width: 3rem;
				height: auto;
			}
		}
	}

	.category-button:hover, .category-button.activated {
		background-color: rgba(0, 0, 0, 0.2);
	}
</style>
