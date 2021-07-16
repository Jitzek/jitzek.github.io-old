<script lang="ts">
	export let src: string;
	export let title: string = 'Navigation';
	export let activated: boolean = false;
</script>

<button class:activated class="menu-button" on:click>
	<div class="menu-button-content">
		<img {src} alt="Navigation Menu" width="auto" height="auto" />
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

		color: inherit;
		font-family: inherit;
		font-size: inherit;

		.menu-button-content {
			display: flex;
			text-align: center;
			justify-content: center;
			align-items: center;

			max-height: 100%;
			img {
				display: inline;
				margin: 0;
				width: 3.25rem;
				height: auto;
				margin-right: 8px;
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
		background-color: rgba(0, 0, 0, 0.2);
		cursor: pointer;
	}
</style>
