import { NavLink } from 'react-router-dom'
import { PageContainer } from '../../../../shared/ui/index.js'
import { APP_ROUTES, siteConfig } from '../../../../shared/config/index.js'
import './SiteFooter.css'

const legalLinks = [
  ['Gizlilik', APP_ROUTES.PRIVACY],
  ['Kullanım Koşulları', APP_ROUTES.TERMS],
]

export function SiteFooter() {
  return (
    <footer className="SiteFooter">
      <PageContainer>
        <div className="SiteFooter__content">
          <div className="SiteFooter__brand">
            <span>{siteConfig.name}</span>
            <p>Alışveriş kararlarını sadeleştiren akıllı karşılaştırma deneyimi.</p>
          </div>
          <nav aria-label="Yasal bağlantılar">
            <ul className="SiteFooter__links">
              {legalLinks.map(([label, to]) => (
                <li key={label}>
                  <NavLink to={to}>{label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <p className="SiteFooter__copyright">© {new Date().getFullYear()} {siteConfig.name}</p>
        </div>
      </PageContainer>
    </footer>
  )
}
