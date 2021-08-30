import { maxWindowZIndex } from "$stores/shared/ProcessesStore";
import type { SvelteComponent } from "svelte";
import type { Program } from "./Program";
import type { Window } from "./Window";

let c_process_id: number = 0;
export class Process {
    public readonly id = c_process_id++;
    public readonly name: string;
    public readonly description: string;
    public readonly icon: string;
    /**
     * A process is an instance of a program, it is instantiated with a copy of the program.
     * @param program 
     */
    constructor(private program: Program, public window: Window = program.window) {
        this.name = program.name;
        this.description = program.description;
        this.icon = program.icon;
    }

    public getProgramId() {
        return this.program.id;
    }

    public hasWindow(): boolean {
        return this.window !== null;
    }

    public getWindow(): Window | null {
        return this.window;
    }

    public bringToTop(): void {
        if (!this.hasWindow()) return;
        this.window.z_index = maxWindowZIndex;
    }
}