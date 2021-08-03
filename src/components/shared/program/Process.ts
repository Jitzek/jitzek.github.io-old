import type { Program } from "./Program";
import { Window } from "./Window";

let c_process_id: number = 0;
export class Process {
    public readonly id = c_process_id++;
    /**
     * A process is an instance of a program, it is instantiated with a copy of the program.
     * @param program 
     */
    constructor(private program: Program, public window: Window = program.window) {
        
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
        console.log(Window.maxZIndex);
        this.window.z_index = Window.maxZIndex;
    }
}