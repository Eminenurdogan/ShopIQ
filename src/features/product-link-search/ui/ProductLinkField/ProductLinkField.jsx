import { Link } from 'lucide-react'
import { TextField } from '../../../../shared/ui/index.js'
import './ProductLinkField.css'

export function ProductLinkField({ error, registration }) {
  return (
    <div className="ProductLinkField">
      <Link aria-hidden="true" className="ProductLinkField__icon" />
      <TextField
        {...registration}
        autoComplete="url"
        error={error}
        inputMode="url"
        label="Ürün bağlantısı"
        placeholder="Ürün bağlantısını yapıştırın..."
        type="url"
      />
    </div>
  )
}
