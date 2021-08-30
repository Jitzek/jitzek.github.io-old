import { derived, Readable, writable, Writable } from "svelte/store";

const _showMenuStore: Writable<boolean> = writable(false);
export const showMenuStore: Readable<boolean> = derived(_showMenuStore, $_showMenuStore => $_showMenuStore);

export function showMenu() {
    _showMenuStore.set(true);
}

export function hideMenu() {
    _showMenuStore.set(false);
}

export function toggleMenu() {
    _showMenuStore.update(_showMenu => !_showMenu);
}