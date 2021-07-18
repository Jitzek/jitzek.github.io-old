/**
    * @param rem Rem to be converted to Pixels
    * @returns The amount of Pixels equivalent to the amount of given Rem.
*/
export function convertRemToPixels(rem: number) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}