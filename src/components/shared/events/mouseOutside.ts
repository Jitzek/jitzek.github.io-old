export function clickOutside(node: any): { destroy(): void; } {
    function handleClick(e: MouseEvent) {
        if (node && !node.contains(e.target) && !e.defaultPrevented) {
            node.dispatchEvent(
                new MouseEvent('clickoutside', node)
            )
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}

export function mouseDownOutside(node: any): { destroy(): void; } {
    function handleMouseDown(e: MouseEvent) {
        if (node && !node.contains(e.target) && !e.defaultPrevented) {
            node.dispatchEvent(
                new MouseEvent('mousedownoutside', node)
            )
        }
    }

    document.addEventListener('mousedown', handleMouseDown, true);

    return {
        destroy() {
            document.removeEventListener('mousedown', handleMouseDown, true);
        }
    }
}

export function mouseUpOutside(node: any): { destroy(): void; } {
    function handleMouseUp(e: MouseEvent) {
        if (node && !node.contains(e.target) && !e.defaultPrevented) {
            node.dispatchEvent(
                new MouseEvent('mouseupoutside', node)
            )
        }
    }

    document.addEventListener('mouseup', handleMouseUp, true);

    return {
        destroy() {
            document.removeEventListener('mouseup', handleMouseUp, true);
        }
    }
}