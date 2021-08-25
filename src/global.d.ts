/// <reference types="@sveltejs/kit" />

declare namespace svelte.JSX {
    interface DOMAttributes<T> {
        onclickoutside?: MouseEvent<T>;
        mousedownoutside?: MouseEvent<T>;
        mouseupoutside?: MouseEvent<T>;
    }
}