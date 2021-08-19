import { ContextMenu } from "$objects/desktop/context_menu/ContextMenu";
import type { ContextMenuOption } from "$objects/desktop/context_menu/ContextMenuOption";
import { Readable, writable, Writable, derived } from "svelte/store";

const _contextMenuStore: Writable<ContextMenu> = writable(new ContextMenu());
export const contextMenuStore: Readable<ContextMenu> = derived(
    _contextMenuStore,
    $_contextMenuStore => $_contextMenuStore
);

export function showContextMenu(x: number, y: number, options: Array<ContextMenuOption>) {
    _contextMenuStore.update((contextMenu) => {
        contextMenu.x = x;
        contextMenu.y = y;
        contextMenu.options = options;
        contextMenu.show = true;
        return contextMenu;
    });
}

export function hideContextMenu() {
    _contextMenuStore.update((contextMenu) => {
        contextMenu.show = false;
        return contextMenu;
    });
}