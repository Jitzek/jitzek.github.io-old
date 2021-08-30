import { categoriesStore } from "$stores/shared/CategoriesStore";

let c_category_id: number = 0;
export class Category {
    public readonly id: number = c_category_id++;

    constructor(public name: Category.Name, public icon: string) {}
}

export namespace Category {
    export enum Name {
        ALL = "All",
        CATEGORY_1 = "A Category 1",
        CATEGORY_2 = "B Category 2",
        FAVOURITES = "Favourites",
    }
}