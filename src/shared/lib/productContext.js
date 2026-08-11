export const PRODUCT_CONTEXT_QUERY_KEYS = {
  PRODUCT_NAME: 'product',
  PRODUCT_URL: 'url',
}

export function buildProductContextUrl(route, context = {}) {
  const searchParams = new URLSearchParams()

  if (context.productName) {
    searchParams.set(PRODUCT_CONTEXT_QUERY_KEYS.PRODUCT_NAME, context.productName)
  }

  if (context.productUrl) {
    searchParams.set(PRODUCT_CONTEXT_QUERY_KEYS.PRODUCT_URL, context.productUrl)
  }

  const query = searchParams.toString()

  return query ? `${route}?${query}` : route
}

export function readProductContext(searchParams) {
  const productName = searchParams.get(PRODUCT_CONTEXT_QUERY_KEYS.PRODUCT_NAME)
  const rawProductUrl = searchParams.get(PRODUCT_CONTEXT_QUERY_KEYS.PRODUCT_URL)
  let productUrl

  if (rawProductUrl) {
    try {
      productUrl = new URL(rawProductUrl).toString()
    } catch {
      productUrl = undefined
    }
  }

  return {
    hasInvalidProductUrl: Boolean(rawProductUrl) && !productUrl,
    productName: productName || undefined,
    productUrl,
  }
}
