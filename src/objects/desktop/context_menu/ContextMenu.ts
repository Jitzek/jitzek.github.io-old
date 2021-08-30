import type { ContextMenuOption } from "./ContextMenuOption";

export class ContextMenu {
    public x: number;
    public y: number;
    public show: boolean;
    public options: Array<ContextMenuOption> = [];
}