import type { Program } from "$components/shared/program/Program";
import { writable, Writable } from "svelte/store";

let _programsStore: Array<Program> = [];
export const programsStore: Writable<Array<Program>> = writable([]);
programsStore.subscribe(programs => _programsStore = programs);

export function addProgram(program: Program) {
    programsStore.update(programs => programs.concat(program));
}

export function removeProgram(program: Program) {
    programsStore.update(programs => {
        programs.splice(programs.indexOf(program), 1);
        return programs;
    });
}

export function removeProgramById(id: number) {
    programsStore.update(programs => programs.filter(program => program.id !== id));
}

export function getProgramById(id: number): Program | undefined {
    return _programsStore.find(_program => _program.id === id);
}