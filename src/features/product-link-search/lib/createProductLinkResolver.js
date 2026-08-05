import { productLinkSchema } from '../model/productLinkSchema.js'

export async function createProductLinkResolver(values) {
  const result = productLinkSchema.safeParse(values)

  if (result.success) {
    return {
      errors: {},
      values: result.data,
    }
  }

  const fieldErrors = result.error.flatten().fieldErrors

  return {
    errors: Object.fromEntries(
      Object.entries(fieldErrors).map(([fieldName, messages]) => [
        fieldName,
        {
          message: messages?.[0],
          type: 'validation',
        },
      ]),
    ),
    values: {},
  }
}
