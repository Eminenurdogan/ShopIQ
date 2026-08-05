import { PageContainer } from '../../../../shared/ui/index.js'
import { siteConfig } from '../../../../shared/config/index.js'
import './SiteFooter.css'

const legalLinks = ['Gizlilik', 'Kullanım Koşulları']

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
              {legalLinks.map((label) => (
                <li key={label}>
                  <a href={`#${label.toLocaleLowerCase('tr-TR')}`}>{label}</a>
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
