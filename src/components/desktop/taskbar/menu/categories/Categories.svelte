<script lang="ts">
	import { slide } from 'svelte/transition';

	import MenuLauncherButton from '$components/desktop/taskbar/menu/categories/MenuLauncherButton.svelte';
	import CategoryButton from '$components/desktop/taskbar/menu/categories/CategoryButton.svelte';

	import type { Category as CategoryObject } from '$objects/shared/program/Category';

	import { categoriesStore, categoryAll, categoryFavourites } from '$stores/shared/CategoriesStore';
	import { programsStore } from '$stores/shared/ProgramsStore';

	class CategoryWrapper {
		constructor(public category: CategoryObject, public activated: boolean) {}
	}

	let categoryWrappers: Array<CategoryWrapper> = [];
	categoriesStore.subscribe((categories) => {
		let existingCategories = categoryWrappers.flatMap(
			(categoryWrapper) => categoryWrapper.category
		);
		// Add all new categories
		categories
			.filter((category) => existingCategories.indexOf(category) === -1)
			.forEach((category) => {
				categoryWrappers.push(new CategoryWrapper(category, false));
			});
		// Filter out removed categories
		categoryWrappers = categoryWrappers.filter((categoryWrapper) =>
			categories.find((category) => category.id === categoryWrapper.category.id)
		);
	});

	function toggleCategory(id: number) {
		categoryWrappers.forEach(
			(categoryWrapper: CategoryWrapper) =>
				(categoryWrapper.activated =
					categoryWrapper.category.id === id && !categoryWrapper.activated)
		);
		categoryWrappers = categoryWrappers;
	}
</script>

<div class="categories-container">
	<div class="category-buttons-container">
		{#each categoryWrappers.sort((a, b) =>
			a.category.id === categoryAll.id || a.category.id === categoryFavourites.id ? 0 : a.category.name.localeCompare(b.category.name)
		) as { category, activated } (category.id)}
			<CategoryButton
				icon={category.icon}
				name={category.name}
				activated={activated}
				on:click={() => toggleCategory(category.id)}
			/>
		{/each}
	</div>
	<div class="category-content-container">
		{#each categoryWrappers as { category, activated }}
			{#if activated}
				{#each $programsStore.sort((a, b) => a.name.localeCompare(b.name)) as program (program.id)}
					{#if program.categories.find(_category => _category.id === category.id) || category.id === categoryAll.id}
						<div in:slide={{ duration: 500 }} out:slide={{ duration: 250 }}>
							<MenuLauncherButton
								program={program}
							/>
						</div>
					{/if}
				{/each}
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
