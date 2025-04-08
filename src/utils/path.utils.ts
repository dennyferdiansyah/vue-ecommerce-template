export const routePaths = {
    home: () => `/`,
    productDetail: (slug: string) => `/product/${slug}`,
    search: (query: string) => `/search/${encodeURIComponent(query)}`,
    category: (categorySlug: string) => `/category/${categorySlug}`,
    favorites: () => `/favorites`,
    cart: () => `/cart`,
}
