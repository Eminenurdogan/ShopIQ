import { Bell, Bot, ChartNoAxesCombined, Heart, House, Menu, Search, Settings, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { APP_ROUTES, siteConfig } from '../../shared/config/index.js'
import { Button } from '../../shared/ui/index.js'
import './DashboardLayout.css'

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

const items = [
  ['Dashboard', APP_ROUTES.DASHBOARD, House],
  ['Ürün Takibi', APP_ROUTES.TRACKING, Bell],
  ['Karşılaştırmalar', APP_ROUTES.COMPARISON, ChartNoAxesCombined],
  ['AI Asistan', APP_ROUTES.ASSISTANT, Bot],
  ['Favoriler', '#', Heart],
  ['Ayarlar', '#', Settings],
]

export function DashboardLayout({ children }) {
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false)
  const drawerRef = useRef(null)
  const menuButtonRef = useRef(null)

  function closeMobileNavigation() {
    setIsMobileNavigationOpen(false)
    menuButtonRef.current?.querySelector('button')?.focus()
  }

  useEffect(() => {
    if (!isMobileNavigationOpen) {
      return undefined
    }

    const drawerElement = drawerRef.current
    const focusableElements = drawerElement?.querySelectorAll(focusableSelector)
    focusableElements?.[0]?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeMobileNavigation()
        return
      }

      if (event.key !== 'Tab' || !focusableElements?.length) {
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.body.classList.add('is-navigation-open')
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('is-navigation-open')
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileNavigationOpen])

  return (
    <div className="DashboardLayout">
      {isMobileNavigationOpen ? (
        <div
          aria-hidden="true"
          className="DashboardLayout__backdrop"
          onMouseDown={closeMobileNavigation}
        />
      ) : null}
      <aside
        aria-label="Dashboard navigasyonu"
        aria-modal={isMobileNavigationOpen || undefined}
        className={`DashboardLayout__sidebar ${isMobileNavigationOpen ? 'DashboardLayout__sidebar--open' : ''}`}
        id="dashboard-mobile-navigation"
        ref={drawerRef}
        role={isMobileNavigationOpen ? 'dialog' : undefined}
      >
        <div className="DashboardLayout__drawerHeader">
          <NavLink className="DashboardLayout__brand" to={APP_ROUTES.HOME} onClick={closeMobileNavigation}>
            {siteConfig.name}
          </NavLink>
          <Button aria-label="Menüyü kapat" className="DashboardLayout__drawerClose" icon={<X />} onClick={closeMobileNavigation} variant="ghost" />
        </div>
        <nav aria-label="Dashboard navigasyonu">
          {items.map(([label, to, Icon]) => (
            <NavLink className="DashboardLayout__link" key={label} to={to} onClick={closeMobileNavigation}>
              <Icon aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="DashboardLayout__main">
        <header className="DashboardLayout__topbar">
          <span ref={menuButtonRef}>
            <Button
              aria-controls="dashboard-mobile-navigation"
              aria-expanded={isMobileNavigationOpen}
              aria-haspopup="dialog"
              aria-label={isMobileNavigationOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              icon={isMobileNavigationOpen ? <X /> : <Menu />}
              onClick={() => setIsMobileNavigationOpen((isOpen) => !isOpen)}
              variant="ghost"
            />
          </span>
          <div className="DashboardLayout__search">
            <Search aria-hidden="true" />
            <span>Ürün, mağaza veya teklif ara</span>
          </div>
          <Button aria-label="Bildirimler" icon={<Bell />} variant="ghost" />
          <span className="DashboardLayout__profile" aria-label="Profil alanı" />
        </header>
        {children}
      </div>
    </div>
  )
}
