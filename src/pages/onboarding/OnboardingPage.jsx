import { ArrowRight, LogIn, UserPlus } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { APP_ROUTES } from '../../shared/config/index.js'
import { Button, PageContainer, TextField } from '../../shared/ui/index.js'
import logoImage from '../../assets/images/logo/shopiq-logo.png'
import './OnboardingPage.css'

function AccountForm({ mode, onSubmit, onSwitchMode }) {
  const isLoginMode = mode === 'login'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  return (
    <>
      <div className="OnboardingPage__formHeading">
        <h1 id="onboarding-title">{isLoginMode ? 'Tekrar hoş geldin.' : 'ShopIQ hesabını oluştur.'}</h1>
        <p>{isLoginMode ? 'Takiplerine ve alışveriş kararlarına kaldığın yerden devam et.' : 'Takiplerini, fırsatlarını ve karşılaştırmalarını tek yerden yönetmeye başla.'}</p>
      </div>
      <form className="OnboardingPage__form" onSubmit={(event) => { event.preventDefault(); onSubmit() }}>
        <TextField autoComplete="email" id="onboarding-email" label="E-posta" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
        <TextField autoComplete={isLoginMode ? 'current-password' : 'new-password'} id="onboarding-password" label="Şifre" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
        {!isLoginMode ? <TextField autoComplete="new-password" id="onboarding-password-confirmation" label="Şifre tekrar" onChange={(event) => setPasswordConfirmation(event.target.value)} required type="password" value={passwordConfirmation} /> : null}
        <Button icon={isLoginMode ? <LogIn aria-hidden="true" /> : <UserPlus aria-hidden="true" />} type="submit">
          {isLoginMode ? 'Giriş Yap' : 'Hesap oluştur'}
        </Button>
      </form>
      <p className="OnboardingPage__switch">
        {isLoginMode ? 'Henüz hesabın yok mu?' : 'Zaten hesabın var mı?'}{' '}
        <button onClick={onSwitchMode} type="button">{isLoginMode ? 'Hesap oluştur' : 'Giriş yap'}</button>
      </p>
    </>
  )
}

export function OnboardingPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode')
  const isAccountMode = mode === 'login' || mode === 'register'

  function selectMode(nextMode) {
    navigate(`${APP_ROUTES.ONBOARDING}?mode=${nextMode}`)
  }

  return (
    <main className="OnboardingPage">
      <PageContainer width="wide">
        <section className="OnboardingPage__content" aria-labelledby="onboarding-title">
          <Link aria-label="ShopIQ ana sayfası" className="OnboardingPage__brand" to={APP_ROUTES.HOME}>
            <img alt="" src={logoImage} />
            <span>ShopIQ</span>
          </Link>

          {isAccountMode ? (
            <AccountForm mode={mode} onSubmit={() => navigate(APP_ROUTES.DASHBOARD)} onSwitchMode={() => selectMode(mode === 'login' ? 'register' : 'login')} />
          ) : (
            <>
              <div className="OnboardingPage__intro">
                <h1 id="onboarding-title">ShopIQ’ya hoş geldin.</h1>
                <p>Alışverişlerini daha akıllı yönetmeye başlayalım.</p>
              </div>
              <section className="OnboardingPage__choiceSection" aria-labelledby="onboarding-choice-title">
                <h2 id="onboarding-choice-title">Nasıl devam etmek istersin?</h2>
                <div className="OnboardingPage__choices">
                  <button className="OnboardingPage__choice" onClick={() => selectMode('login')} type="button">
                    <LogIn aria-hidden="true" />
                    <span><strong>Hesabım var</strong><small>Giriş yap ve ShopIQ’yu kullanmaya devam et.</small></span>
                    <ArrowRight aria-hidden="true" />
                  </button>
                  <button className="OnboardingPage__choice" onClick={() => selectMode('register')} type="button">
                    <UserPlus aria-hidden="true" />
                    <span><strong>Yeni hesap oluştur</strong><small>Takiplerini ve alışverişlerini yönetmek için hesap oluştur.</small></span>
                    <ArrowRight aria-hidden="true" />
                  </button>
                </div>
              </section>
              <div className="OnboardingPage__alternative">
                <Button icon={<ArrowRight aria-hidden="true" />} onClick={() => navigate(APP_ROUTES.DASHBOARD)} variant="ghost">Şimdilik kayıt olmadan keşfet</Button>
                <p>Hesap oluşturmadan ShopIQ deneyimini keşfedebilirsin.</p>
              </div>
            </>
          )}
        </section>
      </PageContainer>
    </main>
  )
}
