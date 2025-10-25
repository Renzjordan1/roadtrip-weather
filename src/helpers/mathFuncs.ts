export const roundToDecimal = (num: number, decimal: number) => {
    return Math.round(num * decimal) / decimal
}