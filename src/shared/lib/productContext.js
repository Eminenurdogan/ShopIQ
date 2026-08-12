export const PRODUCT_CONTEXT_QUERY_KEYS = {
  PRICE: 'price',
  PREVIOUS_PRICE: 'previousPrice',
  PRODUCT_NAME: 'product',
  PRODUCT_URL: 'url',
  PRICE_CHANGE: 'priceChange',
  STORE: 'store',
}

export function buildProductContextUrl(route, context = {}) {
  const searchParams = new URLSearchParams()

  if (context.productName) {
    searchParams.set(PRODUCT_CONTEXT_QUERY_KEYS.PRODUCT_NAME, context.productName)
  }

  if (context.productUrl) {
    searchParams.set(PRODUCT_CONTEXT_QUERY_KEYS.PRODUCT_URL, context.productUrl)
  }

  if (context.store) {
    searchParams.set(PRODUCT_CONTEXT_QUERY_KEYS.STORE, context.store)
  }

  if (context.price) {
    searchParams.set(PRODUCT_CONTEXT_QUERY_KEYS.PRICE, context.price)
  }

  if (context.previousPrice) {
    searchParams.set(PRODUCT_CONTEXT_QUERY_KEYS.PREVIOUS_PRICE, context.previousPrice)
  }

  if (context.priceChange) {
    searchParams.set(PRODUCT_CONTEXT_QUERY_KEYS.PRICE_CHANGE, context.priceChange)
  }

  const query = searchParams.toString()

  return query ? `${route}?${query}` : route
}

export function readProductContext(searchParams) {
  const productName = searchParams.get(PRODUCT_CONTEXT_QUERY_KEYS.PRODUCT_NAME)
  const rawProductUrl = searchParams.get(PRODUCT_CONTEXT_QUERY_KEYS.PRODUCT_URL)
  const store = searchParams.get(PRODUCT_CONTEXT_QUERY_KEYS.STORE)
  const price = searchParams.get(PRODUCT_CONTEXT_QUERY_KEYS.PRICE)
  const previousPrice = searchParams.get(PRODUCT_CONTEXT_QUERY_KEYS.PREVIOUS_PRICE)
  const priceChange = searchParams.get(PRODUCT_CONTEXT_QUERY_KEYS.PRICE_CHANGE)
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
    previousPrice: previousPrice || undefined,
    price: price || undefined,
    priceChange: priceChange || undefined,
    productName: productName || undefined,
    productUrl,
    store: store || undefined,
  }
}
