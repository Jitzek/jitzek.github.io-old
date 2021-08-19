import { Taskbar } from "$objects/desktop/taskbar/Taskbar";
import type { Program } from "$objects/shared/program/Program";
import { Readable, writable, Writable, derived } from "svelte/store";

const taskbar: Taskbar = new Taskbar();
const _taskbarStore: Writable<Taskbar> = writable(taskbar);
export const taskbarStore: Readable<Taskbar> = derived(
    _taskbarStore,
    $_taskbarStore => $_taskbarStore
);

export function addProgramShortcut(program: Program): void {
    taskbar.addProgramShortcut(program)
    _taskbarStore.set(taskbar);
}

export function removeProgramShortcut(program: Program): void {
    taskbar.removeProgramShortcut(program);
    _taskbarStore.set(taskbar);
}

export function containsProgramShortcut(program: Program): boolean {
    return taskbar.containsProgramShortcut(program);
}