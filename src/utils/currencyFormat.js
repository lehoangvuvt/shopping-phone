export function vietnamCurrency(number) {
    return new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(number);
}
export function japanCurrency(number) {
    return new Intl.NumberFormat('jp-JP', { style: 'currency', currency: 'JPY' }).format(number);
}
export function europeCurrency(number) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number);
}