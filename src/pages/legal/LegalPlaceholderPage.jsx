import { FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../shared/config/index.js'
import { Button, PageContainer, StatusMessage } from '../../shared/ui/index.js'
import './LegalPlaceholderPage.css'

export function LegalPlaceholderPage({ title }) {
  const navigate = useNavigate()

  return (
    <main className="LegalPlaceholderPage">
      <PageContainer width="wide">
        <section className="LegalPlaceholderPage__content" aria-labelledby="legal-title">
          <FileText aria-hidden="true" />
          <h1 id="legal-title">{title}</h1>
          <StatusMessage type="info">Bu yasal içerik sayfası yayın öncesi tamamlanacaktır.</StatusMessage>
          <Button onClick={() => navigate(APP_ROUTES.HOME)} variant="secondary">Ana Sayfaya Dön</Button>
        </section>
      </PageContainer>
    </main>
  )
}
