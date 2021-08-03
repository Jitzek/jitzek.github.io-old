import type { Process } from "$components/shared/program/Process";
import { Window } from "$components/shared/program/Window";
import { writable, Writable } from "svelte/store";

export const processesStore: Writable<Array<Process>> = writable([]);

processesStore.subscribe(processes => {
    // Set the max Z Index to the amount of active windows
    Window.maxZIndex = processes.filter(process => process.window !== null).length;
});