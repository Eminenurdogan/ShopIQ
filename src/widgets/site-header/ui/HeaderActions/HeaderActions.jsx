import { ArrowRight, LogIn } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../../../shared/config/index.js'
import { Button } from '../../../../shared/ui/index.js'
import './HeaderActions.css'

export function HeaderActions() {
  const navigate = useNavigate()

  return (
    <div className="HeaderActions">
      <Button icon={<LogIn aria-hidden="true" />} onClick={() => navigate(`${APP_ROUTES.ONBOARDING}?mode=login`)} variant="ghost">Giriş Yap</Button>
      <Button icon={<ArrowRight aria-hidden="true" />} onClick={() => navigate(APP_ROUTES.ONBOARDING)}>
        Kullanmaya Başla
      </Button>
    </div>
  )
}
