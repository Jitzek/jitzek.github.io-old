import type { Program } from "$objects/shared/program/Program";
import { ProgramShortcut } from "./ProgramShortcut";

export class Taskbar {
    public programShortcuts: Array<ProgramShortcut> = [];

    public addProgramShortcut(program: Program) {
        this.programShortcuts.push(new ProgramShortcut(program));
    }

    public removeProgramShortcut(program: Program) {
        this.programShortcuts = this.programShortcuts.filter(programShortcut => programShortcut.program.id !== program.id);
    }

    public containsProgramShortcut(program: Program): boolean {
        return this.programShortcuts.find(programShortcut => programShortcut.program.id === program.id) !== undefined;
    }
}