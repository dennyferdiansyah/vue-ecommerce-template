export type FormatPriceOptions = {
    currency?: string // e.g., 'USD', 'IDR', 'SGD'
    locale?: string   // e.g., 'en-US', 'id-ID', 'ms-SG'
    minimumFractionDigits?: number
    maximumFractionDigits?: number
}