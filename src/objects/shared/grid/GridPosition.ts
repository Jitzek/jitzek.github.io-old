import { convertRemToPixels } from "../conversions";
import { Grid } from "./Grid";
import type { GridItem } from "./GridItem";

export class GridPosition {
    constructor(
        public item: GridItem | null,
        public row: number,
        public column: number,
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public gap: number
    ) { }

    public collidesWith(x: number, y: number) {
        return (
            x > this.x - convertRemToPixels(this.width / 2) + convertRemToPixels(this.gap / 2) &&
            x < this.x + convertRemToPixels(this.width / 2) + convertRemToPixels(this.gap / 2) &&
            y > this.y - convertRemToPixels(this.height / 2) + convertRemToPixels(this.gap / 2) &&
            y < this.y + convertRemToPixels(this.height / 2) + convertRemToPixels(this.gap / 2)
        );
    }
}