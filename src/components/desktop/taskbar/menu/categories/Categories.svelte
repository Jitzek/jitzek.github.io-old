<script lang="ts">
	import MenuLauncherButton from '$components/desktop/taskbar/menu/categories/MenuLauncherButton.svelte';
	import { fly, fade, blur, crossfade, draw, scale, slide } from 'svelte/transition';

	class CategoryContentObject {
		constructor(
			public id: number,
			public name: string,
			public description: string,
			public icon: string,
			public alt: string
		) {}
	}

	class CategoryObject {
		constructor(
			public id: number,
			public name: string,
			public icon: string,
			public alt: string,
			public content: Array<CategoryContentObject>,
			public activated: boolean
		) {}
	}

	let categories: Array<CategoryObject> = [];

	categories.push(
		new CategoryObject(
			0,
			'Category 1',
			'/images/icons/utilities-terminal.svg',
			'Category 1',
			new Array<CategoryContentObject>(
				new CategoryContentObject(
					0,
					'Content 11111',
					'Description 1',
					'/images/icons/utilities-terminal.svg',
					'Content 1'
				)
			),
			false
		),
		new CategoryObject(
			1,
			'Category 2',
			'/images/icons/utilities-terminal.svg',
			'Category 2',
			new Array<CategoryContentObject>(
				new CategoryContentObject(
					1,
					'Content 2',
					'Description 2 af af afaefaef',
					'/images/icons/utilities-terminal.svg',
					'Content 2'
				)
			),
			false
		)
	);

	function toggleCategory(id: number) {
		categories.forEach(
			(category: CategoryObject) => (category.activated = category.id === id && !category.activated)
		);
		categories = categories;
	}
</script>

<div class="categories-container">
	<div class="category-buttons-container">
		{#each categories as { id, name, icon, alt, activated }}
			<MenuLauncherButton {icon} {name} {alt} {activated} on:click={() => toggleCategory(id)} />
		{/each}
	</div>
	<div class="category-content-container">
		{#each categories as { content, activated }}
			{#if activated}
				<div in:slide={{ duration: 500 }} out:slide={{ duration: 250 }}>
					{#each content as { name, description, icon, alt }}
						<MenuLauncherButton {icon} {name} {description} {alt} />
						<MenuLauncherButton {icon} {name} {description} {alt} />
						<MenuLauncherButton {icon} {name} {description} {alt} />
						<MenuLauncherButton {icon} {name} {description} {alt} />
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.categories-container {
		display: flex;
		height: 20rem;
		width: 100%;

		.category-buttons-container {
			overflow-y: auto;
			overflow-x: hidden;
			padding-right: 0.5rem;
			width: 100%;
			flex: 1;
		}

		.category-content-container {
			overflow-y: auto;
			overflow-x: hidden;
			width: 100%;
			flex: 2;
		}
	}
</style>
