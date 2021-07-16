<script lang="ts">
	import CategoryButton from '$desktop/taskbar/menu/categories/CategoryButton.svelte';
	import { fly, fade } from 'svelte/transition';

	class CategoryContentObject {
		constructor(public id: number, public name: string, public icon: string, public alt: string) {}
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
					'/images/icons/utilities-terminal.svg',
					'Content 2'
				)
			),
			false
		)
	);

	function toggleCategory(id: number) {
		categories.forEach((category: CategoryObject) => (category.activated = category.id === id));
		categories = categories;
	}
</script>

<div class="categories-container">
	<div class="category-buttons-container">
		{#each categories as { id, name, icon, alt, activated }}
			<CategoryButton icon="{icon}" name="{name}" alt="{alt}" activated="{activated}"  on:click={() => toggleCategory(id)} />
		{/each}
	</div>
	{#each categories as { content, activated }}
		{#if activated}
			<div class="category-content-container">
				{#each content as { name, icon, alt }}
					<div>
						{name}
					</div>
				{/each}
			</div>
		{/if}
	{/each}
</div>

<style lang="scss">
	.categories-container {
		display: flex;

		.category-buttons-container {
			padding-right: 0.5rem;
		}

		.category-content-container {
			transition: opacity 0.5s;
		}
	}
</style>
