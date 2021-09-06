import { Grid } from "$objects/shared/grid/Grid";
import type { GridItem } from "$objects/shared/grid/GridItem";
import type { Program } from "$objects/shared/program/Program";
import { derived, Readable, writable, Writable } from "svelte/store";

let _gridStore: Writable<Grid> = writable(new Grid());
export let gridStore: Readable<Grid> = derived(_gridStore, $_gridStore => $_gridStore);

export function rearrangeGrid(screenWidth: number, screenHeight: number) {
    _gridStore.update(_grid => {
        _grid.rearrangeGrid(screenWidth, screenHeight);
        return _grid;
    });
}

export function addGridItem(gridItem: GridItem) {
    _gridStore.update(_grid => {
        _grid.addGridItem(gridItem);
        _grid.rearrangeGrid();
        return _grid;
    });
}

export function removeGridItem(id: number) {
    _gridStore.update(_grid => {
        _grid.removeGridItem(id);
        _grid.rearrangeGrid();
        return _grid;
    });
}

export function setGridParameters(gap: number, widthOffset: number, topOffset: number, bottomOffset: number, padding: number, columnWidth: number, columnHeight: number) {
    _gridStore.update(_grid => {
        _grid.gap = gap;
        _grid.widthOffset = widthOffset;
        _grid.topOffset = topOffset;
        _grid.bottomOffset = bottomOffset;
        _grid.padding = padding;
        _grid.columnWidth = columnWidth;
        _grid.columnHeight = columnHeight;
        return _grid;
    });
}

export function selectGridItem(gridItem: GridItem) {
    _gridStore.update(_grid => {
        _grid.gridItems.find(_gridItem => _gridItem.id === gridItem.id).selected = true;
        return _grid;
    });
}

export function deselectGridItem(gridItem: GridItem) {
    _gridStore.update(_grid => {
        _grid.gridItems.find(_gridItem => _gridItem.id === gridItem.id).selected = false;
        return _grid;
    });
}

export function setPreferredPositionOfGridItem(gridItem: GridItem, preferredRow: number, preferredColumn: number) {
    _gridStore.update(_grid => {
        let _updatedGridItem = _grid.gridItems.find(_gridItem => _gridItem.id === gridItem.id);
        _updatedGridItem.preferredRow = preferredRow;
        _updatedGridItem.preferredColumn = preferredColumn;
        _grid.rearrangeGrid();
        return _grid;
    });
}