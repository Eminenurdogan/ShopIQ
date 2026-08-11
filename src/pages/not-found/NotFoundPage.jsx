import { SearchX } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../shared/config/index.js'
import { Button, PageContainer, StatusMessage } from '../../shared/ui/index.js'
import './NotFoundPage.css'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <main className="NotFoundPage">
      <PageContainer width="wide">
        <section className="NotFoundPage__content" aria-labelledby="not-found-title">
          <SearchX aria-hidden="true" />
          <h1 id="not-found-title">Aradığın sayfayı bulamadık.</h1>
          <StatusMessage type="info">Bağlantıyı kontrol edebilir veya Dashboard’a dönebilirsin.</StatusMessage>
          <Button onClick={() => navigate(APP_ROUTES.DASHBOARD)}>Dashboard’a Dön</Button>
        </section>
      </PageContainer>
    </main>
  )
}
