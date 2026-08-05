import { APP_ROUTES } from '../../../shared/config/index.js'

export function buildCompareUrl(productLink) {
  const searchParams = new URLSearchParams({ url: productLink })

  return `${APP_ROUTES.COMPARE}?${searchParams.toString()}`
}
