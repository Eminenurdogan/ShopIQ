import { Menu } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button, PageContainer } from '../../../../shared/ui/index.js'
import { BrandLogo } from '../BrandLogo/BrandLogo.jsx'
import { HeaderActions } from '../HeaderActions/HeaderActions.jsx'
import { MobileNavigation } from '../MobileNavigation/MobileNavigation.jsx'
import { Navigation } from '../Navigation/Navigation.jsx'
import './SiteHeader.css'

export function SiteHeader() {
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false)
  const menuButtonRef = useRef(null)

  function closeMobileNavigation() {
    setIsMobileNavigationOpen(false)
    menuButtonRef.current?.querySelector('button')?.focus()
  }

  return (
    <header className="SiteHeader">
      <PageContainer width="wide">
        <div className="SiteHeader__content">
          <BrandLogo />
          <Navigation />
          <div className="SiteHeader__actions">
            <HeaderActions />
            <span ref={menuButtonRef}>
              <Button
                aria-expanded={isMobileNavigationOpen}
                aria-haspopup="dialog"
                aria-label="Menüyü aç"
                className="SiteHeader__menuTrigger"
                icon={<Menu />}
                onClick={() => setIsMobileNavigationOpen(true)}
                variant="ghost"
              />
            </span>
          </div>
        </div>
      </PageContainer>
      <MobileNavigation
        isOpen={isMobileNavigationOpen}
        onClose={closeMobileNavigation}
      />
    </header>
  )
}
