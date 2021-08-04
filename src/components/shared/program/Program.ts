import { Process } from "./Process";
import type { Window } from "./Window";
import { processesStore, addProcess } from "$stores/shared/ProcessesStore";
import type { Category } from "./Category";

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
        public category: Category,
        public icon: string,
        public window: Window | null = null
    ) {

    }

    public createProcess(): Process {
        let newProcess = new Process(JSON.parse(JSON.stringify(this)) as Program);
        addProcess(newProcess);
        return newProcess;
    }
}