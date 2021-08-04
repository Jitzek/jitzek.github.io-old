import { Category } from "$components/shared/program/Category";
import { writable, Writable } from "svelte/store";

let _categoriesStore: Array<Category> = [];
export const categoriesStore: Writable<Array<Category>> = writable([
    new Category(Category.Name.CATEGORY_2, "/images/icons/utilities-terminal.svg"),
    new Category(Category.Name.CATEGORY_1, "/images/icons/utilities-terminal.svg"),
]);
categoriesStore.subscribe(categories => _categoriesStore = categories);

export function addCategory(category: Category) {
    categoriesStore.update(categories => categories.concat(category));
}

export function removeCategory(category: Category) {
    categoriesStore.update(categories => {
        categories.splice(categories.indexOf(category), 1);
        return categories;
    });
}

export function removeCategoryById(id: number) {
    categoriesStore.update(categories => categories.filter(Category => Category.id !== id));
}

export function getCategoryByName(name: Category.Name) {
    return _categoriesStore.find(_category => _category.name == name);
}