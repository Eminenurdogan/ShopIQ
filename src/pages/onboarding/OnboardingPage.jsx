import { ArrowRight, LogIn, UserPlus } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { APP_ROUTES } from '../../shared/config/index.js'
import { Button, PageContainer, StatusMessage } from '../../shared/ui/index.js'
import './OnboardingPage.css'

export function OnboardingPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode')

  return (
    <main className="OnboardingPage">
      <PageContainer width="wide">
        <section className="OnboardingPage__content" aria-labelledby="onboarding-title">
          <span className="OnboardingPage__eyebrow">ShopIQ hesabı</span>
          <h1 id="onboarding-title">Alışveriş kararlarını tek yerde yönet.</h1>
          <p>Takiplerini, fiyat değişimlerini ve karşılaştırmalarını Dashboard üzerinden yönetmek için devam et.</p>
          <StatusMessage type="info">Bu ekran frontend demo akışıdır; henüz gerçek hesap oluşturma veya giriş işlemi yapılmaz.</StatusMessage>
          <div className="OnboardingPage__actions">
            <Button icon={<LogIn aria-hidden="true" />} onClick={() => navigate(APP_ROUTES.DASHBOARD)} variant={mode === 'login' ? 'primary' : 'secondary'}>
              Giriş Yap (Demo)
            </Button>
            <Button icon={<UserPlus aria-hidden="true" />} onClick={() => navigate(APP_ROUTES.DASHBOARD)} variant={mode === 'login' ? 'secondary' : 'primary'}>
              Kayıt Ol (Demo)
            </Button>
          </div>
          <Button icon={<ArrowRight aria-hidden="true" />} onClick={() => navigate(APP_ROUTES.DASHBOARD)} variant="ghost">
            Hesap oluşturmadan Dashboard’u incele
          </Button>
        </section>
      </PageContainer>
    </main>
  )
}
