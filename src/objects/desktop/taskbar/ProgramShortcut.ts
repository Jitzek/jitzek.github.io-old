import type { Program } from "$objects/shared/program/Program";
import { TaskbarItem } from "./TaskbarItem";

export class ProgramShortcut extends TaskbarItem {
    constructor(public program: Program) {
        super();
    }
}