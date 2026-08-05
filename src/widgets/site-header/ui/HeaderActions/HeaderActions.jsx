import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../../../shared/config/index.js'
import { Button } from '../../../../shared/ui/index.js'
import './HeaderActions.css'

export function HeaderActions() {
  const navigate = useNavigate()

  return (
    <div className="HeaderActions">
      <Button icon={<ArrowRight />} onClick={() => navigate(APP_ROUTES.COMPARE)}>
        Ürün Karşılaştır
      </Button>
    </div>
  )
}
