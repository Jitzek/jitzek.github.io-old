import type { Program } from "$objects/shared/program/Program";

let c_id = 0;
export class GridItem {
    public readonly id: number = c_id++;

    constructor(
        public program: Program,
        public preferredRow: number,
        public preferredColumn: number,
        public selected: boolean = false
    ) { }
}