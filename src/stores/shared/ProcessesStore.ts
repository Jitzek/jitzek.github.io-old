import type { Process } from "$components/shared/program/Process";
import { Window } from "$components/shared/program/Window";
import { writable, Writable } from "svelte/store";

export const processesStore: Writable<Array<Process>> = writable([]);

processesStore.subscribe(processes => {
    Window.maxZIndex = processes.map(process => process.window).filter(window => window !== null).length;
});