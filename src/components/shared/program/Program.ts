import { Process } from "./Process";
import type { Window } from "./Window";
import { processesStore } from "$stores/shared/ProcessesStore";

let c_program_id = 0;
export class Program {
    public readonly id: number = c_program_id++;

    /**
     * A Program contains the initial information needed to instantiate processes
     * @param name Name of program
     * @param description Description of program
     * @param category Category of program
     * @param icon Icon src of program
     * @param window Initial window of program
     */
    constructor(
        public name: string,
        public description: string,
        public category: Program.Category,
        public icon: string,
        public window: Window | null = null
    ) {

    }

    public createProcess(): Process {
        let newProcess = new Process(JSON.parse(JSON.stringify(this)) as Program);
        processesStore.update(processes => {
            return [...processes, newProcess];
        });
        return newProcess;
    }

    public removeProcess(processId: number): void {
        processesStore.update(processes => {
            return processes.filter(process => process.id !== processId);
        });
    }
}

export namespace Program {
    export enum Category {
        NONE,
        CATEGORY1 = "Category 1",
        CATEGORY2 = "Category 2"
    }
}