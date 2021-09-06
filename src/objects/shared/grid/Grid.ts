import { convertRemToPixels } from "../conversions";
import type { GridItem } from "./GridItem"
import { GridPosition } from "./GridPosition";

export class Grid {
    public gridItems: Array<GridItem> = [];
    public gridPositions: Array<GridPosition> = [];
    public gridTemplateColumns: string = '';
    public gridItemBeingDragged: GridItem | null = null;

    public gap: number;
    public widthOffset: number;
    public topOffset: number;
    public bottomOffset: number;
    public padding: number;
    public columnWidth: number;
    public columnHeight: number;

    private prevScreenWidth: number;
    private prevScreenHeight: number;

    public rearrangeGrid(screenWidth: number = this.prevScreenWidth, screenHeight: number = this.prevScreenHeight) {
        this.prevScreenWidth = screenWidth;
        this.prevScreenHeight = screenHeight;
        let rows = Math.floor(
            (screenHeight - convertRemToPixels(this.padding + this.bottomOffset + this.topOffset)) /
            convertRemToPixels(this.columnHeight + this.gap)
        );
        let columnsPerRow = Math.round(
            (screenWidth - convertRemToPixels(this.padding)) /
            convertRemToPixels(this.columnWidth + this.gap + this.widthOffset)
        );
        this.gridTemplateColumns = `repeat(${columnsPerRow}, ${this.columnWidth}rem)`;

        this.gridPositions = [];
        // Fill up grid with empty grid positions
        for (let row = 1; row < rows + 1; row++) {
            for (let column = 1; column < columnsPerRow + 1; column++) {
                this.gridPositions.push(
                    new GridPosition(
                        null,
                        row,
                        column,
                        column * convertRemToPixels(this.columnWidth + this.gap) -
                        convertRemToPixels(this.gap + this.columnWidth / 2),
                        row * convertRemToPixels(this.columnHeight + this.gap) -
                        convertRemToPixels(this.gap + this.columnHeight / 2),
                        this.columnWidth,
                        this.columnHeight,
                        this.gap
                    )
                );
            }
        }


        if (this.gridPositions.length <= 0) {
            return;
        }

        /*
            Assign gridItems to GridPositions.
            Rearrange gridItems to fit within grid.
            Automatically return gridItems to their preferred position.
        */
        this.gridItems.forEach((gridItem) => {
            let preferredRow = gridItem.preferredRow;
            let preferredColumn = gridItem.preferredColumn;
            if (gridItem.preferredRow < 0 || gridItem.preferredRow > rows) {
                preferredRow = rows;
            }
            if (gridItem.preferredColumn < 0 || gridItem.preferredColumn > columnsPerRow) {
                preferredColumn = columnsPerRow;
            }

            let emptyGridPositions = this.gridPositions.filter((position) => position.item == null);
            if (emptyGridPositions.length > 0) {
                let preferredGridPosition = emptyGridPositions.reduce((prev, current) => {
                    return Math.abs(current.row - preferredRow) < Math.abs(prev.row - preferredRow) ||
                        Math.abs(current.column - preferredColumn) < Math.abs(prev.column - preferredColumn)
                        ? current
                        : prev;
                });
                preferredGridPosition.item = gridItem;
                gridItem.position = preferredGridPosition;
            }
        });
    }

    public addGridItem(gridItem: GridItem) {
        this.gridItems.push(gridItem);
    }

    public removeGridItem(id: number) {
        this.gridItems = this.gridItems.filter(gridItem => gridItem.id !== id);
    }

    
	public getGridPositionAtPosition(x: number, y: number): GridPosition | null {
		return this.gridPositions.find((position) => position.collidesWith(x, y));
	}

	public getClosestGridPositionToPosition(
		x: number,
		y: number,
		filter: (position: GridPosition) => boolean = () => true
	): GridPosition | null {
		return this.gridPositions.filter(filter).reduce((prev, current) => {
			return Math.abs(current.x - x) < Math.abs(prev.x - x) ||
				Math.abs(current.y - y) < Math.abs(prev.y - y) - convertRemToPixels(this.columnHeight)
				? current
				: prev;
		});
	}
}