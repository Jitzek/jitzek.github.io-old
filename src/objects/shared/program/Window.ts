export class Window {
    public static maxZIndex: number = 1;
    public z_index: number = 1;

    constructor(
        public contentType: Window.ContentType,
        public content: string,
        public width: number,
        public height: number,
        // Keep null for automatic center
        public x: number | null = null,
        // Keep null for automatic center
        public y: number | null = null,
        public fullscreen: boolean = false,
        public minimized: boolean = false
    ) {
        
    }
}

export namespace Window {
    export enum ContentType {
        NONE,
        URL,
        COMPONENT
    }
}