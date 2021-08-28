export function isStringANumber(str: string) {
    return (str.length > 0) && !isNaN(+str);
}

export function isStringAPositiveNumber(str: string) {
    return isStringANumber(str) && +str >= 0;
}

export function isStringANegativeNumber(str: string) {
    return isStringANumber(str) && +str < 0;
}

export function isInteger(n: number) {
    return Number.isSafeInteger(n);
}

export function isFloat(n: number) {
    return !Number.isSafeInteger(n);
}