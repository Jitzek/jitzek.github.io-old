export class Window {
    public z_index: number = 1;

    constructor(
        public component: any,
        public componentAttributes: Object = {},
        public width: number | null = null,
        public height: number | null = null,
        // Keep null for automatic center
        public x: number | null = null,
        // Keep null for automatic center
        public y: number | null = null,
        public fullscreen: boolean = false,
        public minimized: boolean = false
    ) {
    }
}

// export namespace Window {
//     export enum ContentType {
//         NONE,
//         URL,
//         COMPONENT
//     }
// }