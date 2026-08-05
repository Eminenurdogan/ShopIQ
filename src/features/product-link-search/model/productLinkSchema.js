import { z } from 'zod'

const PRODUCT_LINK_MAX_LENGTH = 2048

export const productLinkSchema = z.object({
  productLink: z
    .string()
    .trim()
    .min(1, 'Ürün bağlantısı gereklidir.')
    .max(
      PRODUCT_LINK_MAX_LENGTH,
      'Ürün bağlantısı çok uzun. Lütfen daha kısa bir bağlantı kullanın.',
    )
    .url('Geçerli bir ürün bağlantısı girin.'),
})

export const productLinkDefaultValues = {
  productLink: '',
}
