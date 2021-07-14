import { writable, derived, Writable } from "svelte/store";

export const desktop = writable(true);

export const mobile = derived(
    desktop,
    $desktop => !$desktop
);

export const setup: (
    arg: { desktopQuery: string }
) => any = ({ desktopQuery }) => {
    // Make sure "window" is defined
    desktop.set(window.matchMedia(desktopQuery).matches);
};