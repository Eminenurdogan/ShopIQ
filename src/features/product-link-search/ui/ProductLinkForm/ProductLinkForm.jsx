import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button, StatusMessage } from '../../../../shared/ui/index.js'
import { buildCompareUrl } from '../../lib/buildCompareUrl.js'
import { createProductLinkResolver } from '../../lib/createProductLinkResolver.js'
import { productLinkDefaultValues } from '../../model/productLinkSchema.js'
import { ProductLinkField } from '../ProductLinkField/ProductLinkField.jsx'
import './ProductLinkForm.css'

export function ProductLinkForm({ submitLabel = 'Ürünü Analiz Et' }) {
  const navigate = useNavigate()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: productLinkDefaultValues,
    resolver: createProductLinkResolver,
  })

  function handleValidSubmit({ productLink }) {
    navigate(buildCompareUrl(productLink))
  }

  const errorMessage = errors.productLink?.message

  return (
    <form
      className="ProductLinkForm"
      noValidate
      onSubmit={handleSubmit(handleValidSubmit)}
    >
      <div className="ProductLinkForm__controls">
        <ProductLinkField
          error={errorMessage}
          registration={register('productLink')}
        />
        <Button type="submit">{submitLabel}</Button>
      </div>
      {errorMessage ? (
        <StatusMessage type="error">{errorMessage}</StatusMessage>
      ) : null}
    </form>
  )
}
