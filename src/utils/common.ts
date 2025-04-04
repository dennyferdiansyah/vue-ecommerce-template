import type {FormatPriceOptions} from "@/types/price.ts";

const INVALID_IMAGE_DOMAINS = ['placeimg.com', 'via.placeholder.com', 'prnt.sc', 'reddit.com', 'nextjs-milestone.s3.us-east-1.amazonaws.com']

export function getImageUrl(image: string | string[] | null | undefined): string {
    let finalUrl: string | undefined

    if (Array.isArray(image)) {
        finalUrl = image.find(img => isValidImageUrl(img))
    } else if (typeof image === 'string' && image.trim() !== '') {
        finalUrl = isValidImageUrl(image) ? image : undefined
    }

    return finalUrl ?? getDefaultImage()
}

function isValidImageUrl(url: string): boolean {
    return !INVALID_IMAGE_DOMAINS.some(domain => url.includes(domain))
}

function getDefaultImage(): string {
    const fallbackIds = [
        1067, 1027, 1011, 103, 338, 433, 678, 823, 932,
        450, 885, 984, 1084, 110, 503, 637, 998
    ]

    const id = fallbackIds[Math.floor(Math.random() * fallbackIds.length)]
    return `https://picsum.photos/id/${id}/300/300`
}

export function formatPrice(
    amount: number,
    options: FormatPriceOptions = {}
): string {
    const {
        currency = 'USD',
        locale = 'en-US',
        minimumFractionDigits = 0,
        maximumFractionDigits = 2
    } = options

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits,
        maximumFractionDigits
    }).format(amount)
}