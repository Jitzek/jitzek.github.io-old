import { writable, derived, Writable, Readable } from "svelte/store";

export const desktop: Writable<boolean> = writable(true);

export const mobile: Readable<boolean> = derived(
    desktop,
    $desktop => !$desktop
);

export enum DeviceType {
    AUTO,
    DESKTOP,
    MOBILE
}

let forcedDeviceType: DeviceType = DeviceType.AUTO;
let isListening: boolean = false;

function handleMatchMediaChange(e: MediaQueryListEvent) {
    if (forcedDeviceType != DeviceType.AUTO) {
        return;
    }
    desktop.set(e.matches);
}

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
    isListening = listen;
    // Make sure "window" is defined
    try {
        desktop.set(window.matchMedia(desktopQuery).matches);
        if (listen) {
            // Add an event listener
            // Fun fact: Getting the "matches" variable from the `MediaQueryListEvent` variable is called object de-structuring
            window.matchMedia(desktopQuery).addEventListener("change", handleMatchMediaChange);
            return;
        }
    }
    catch (error) {
        console.error(`
        \r${error}
        \rMake sure window is assigned by calling this function within the \`onMount\` function.`)
    }
};

export function forceDeviceType(deviceType: DeviceType) {
    forcedDeviceType = deviceType;
    switch(forcedDeviceType) {
        case DeviceType.DESKTOP:
            desktop.set(true);
            break;
        case DeviceType.MOBILE:
            desktop.set(false);
            break;
        case DeviceType.AUTO:
        default:
            break;
    }
}