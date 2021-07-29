<script lang="ts">
	export let name: string;
	export let description: string = null;
	export let icon: string;
	export let alt: string = 'Launcher';
	export let activated: boolean = false;
</script>

<button class:activated class="menu-launcher-button" on:click>
	<div class="menu-launcher-button-content">
		<img src={icon} {alt} />
		<div class="name-and-description">
			<span class="name">{name}</span>
			{#if description}
				<br />
				<span class="description">{description}</span>
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
		height: 2.5rem;

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
