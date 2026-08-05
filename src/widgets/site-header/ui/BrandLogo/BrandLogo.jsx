import { Link } from 'react-router-dom'
import { APP_ROUTES, siteConfig } from '../../../../shared/config/index.js'
import logoImage from '../../../../assets/images/logo/shopiq-logo.png'
import './BrandLogo.css'

export function BrandLogo() {
  return (
    <Link className="BrandLogo" to={APP_ROUTES.HOME} aria-label={`${siteConfig.name} ana sayfası`}>
      <img className="BrandLogo__image" src={logoImage} alt="" />
      <span className="BrandLogo__name">{siteConfig.name}</span>
    </Link>
  )
}
