import { convertRemToPixels } from "../conversions";

let c_id: number = 0;
class GridObject {
    public readonly id: number = c_id++;
    public selected: boolean = false;

    constructor(public element: HTMLElement, public preferredRow: number, public preferredColumn: number) {}
}

class GridPosition {
    private gridObject: GridObject | null = null;

    constructor(public row: number, public column: number, public x: number, public y: number) {}
    
    public setObject(gridObject: GridObject | null) {
        this.gridObject = gridObject;
    }

    public hasObject(): boolean {
        return this.gridObject != null;
    }

    public getObject(): GridObject {
        return this.gridObject;
    }
}

export class Grid {
    public gridObjects: Array<GridObject> = [];
    public gridPositions: Array<GridPosition> = [];

    private rows: number;
    private columnsPerRow: number;

    private dragStartPosition: ({ x: number, y: number });
    private dragEndPosition: ({ x: number, y: number });

    constructor(private columnWidth: number, private columnHeight: number, private gap: number, private padding: number) {}

    public create(screenWidth: number, screenHeight: number, offsetWidth: number, offsetHeight: number) {
		this.rows = Math.floor(
			(screenHeight - convertRemToPixels(this.padding)) /
				convertRemToPixels(this.columnHeight + this.gap + offsetHeight)
		);
        this.columnsPerRow = Math.floor(
			(screenWidth - convertRemToPixels(this.padding)) /
				convertRemToPixels(this.columnWidth + this.gap + offsetWidth)
		);
    }

    public getGridTemplateColumns(): string {
        return `repeat(${this.columnsPerRow}, ${this.columnWidth}rem)`
    }

    public addObject(element: HTMLElement, preferredRow: number, preferredColumn: number) {
        this.gridObjects.push(new GridObject(element, preferredRow, preferredColumn));
    }

    public selectObject(objectId: number) {
        this.gridObjects.find((object) => object.id == objectId).selected = true;
    }

    public deselectObject(objectId: number) {
        this.gridObjects.find((object) => object.id == objectId).selected = false;
    }

    public onDragStart(e: MouseEvent) {
        if (!this.gridObjects.find((object) => object.selected == true)) {
            // No objects selected
            return;
        }
        this.dragStartPosition = { x: e.clientX, y: e.clientY };
    }

    /*
        The dragend event will always show 0 for the clientX and clientY on Firefox.
        As a workaround we can keep track of the end position by taking the last clientX and clientY of the dragover event.
    */
    public onDragOver(e: MouseEvent) {
        this.dragEndPosition = { x: e.clientX, y: e.clientY };
    }

    public onDragEnd(e: MouseEvent) {
        if (!this.gridObjects.find((object) => object.selected == true)) {
            // No objects selected
            return;
        }

        let offsetX: number = this.dragEndPosition.x - this.dragStartPosition.x;
        let offsetY: number = this.dragEndPosition.y - this.dragStartPosition.y;

        console.log(`${offsetX} ${offsetY}`);
    }
}