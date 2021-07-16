import { writable, derived, Writable, Readable } from "svelte/store";

export const desktop: Writable<boolean> = writable(true);

export const mobile: Readable<boolean> = derived(
    desktop,
    $desktop => !$desktop
);

/**
 * 
 * @param args
 * - desktopQuery: Query to match to determine whether a user is visiting on a desktop
 * - listen: When true adds an event listener to the matchMedia function changing the stores dynamically
 * @returns 
 */
export const setup: (
    args: { desktopQuery: string, listen: boolean }
) => void = ({ desktopQuery, listen }) => {
    // Make sure "window" is defined
    try {
        if (listen) {
            // Add an event listener
            // Fun fact: Getting the "matches" variable from the `MediaQueryListEvent` variable is called object de-structuring
            window.matchMedia(desktopQuery).addEventListener("change", ({ matches }) => {
                desktop.set(matches);
            });
            return;
        }
        desktop.set(window.matchMedia(desktopQuery).matches);
    }
    catch (error) {
        console.error(`
        \r${error}
        \rMake sure window is assigned by calling this function within the \`onMount\` function.`)
    }
};