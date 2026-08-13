import { Bell, Bot, ChartNoAxesCombined, CircleUserRound, House, LogOut, Menu, Search, Settings, UserRound, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { APP_ROUTES, siteConfig } from '../../shared/config/index.js'
import { Button } from '../../shared/ui/index.js'
import logoImage from '../../assets/images/logo/shopiq-logo.png'
import './DashboardLayout.css'

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

const items = [
  ['Dashboard', APP_ROUTES.DASHBOARD, House],
  ['Ürün Takibi', APP_ROUTES.TRACKING, Bell],
  ['Karşılaştırmalar', APP_ROUTES.COMPARISON, ChartNoAxesCombined],
  ['AI Asistan', APP_ROUTES.ASSISTANT, Bot],
]

const mockSearchItems = [
  ['Dyson Airwrap karşılaştırması', APP_ROUTES.COMPARISON],
  ['Ürün takibi', APP_ROUTES.TRACKING],
  ['Akıllı öneriler', APP_ROUTES.ASSISTANT],
  ['Dashboard özeti', APP_ROUTES.DASHBOARD],
]

const mockNotifications = [
  'Dyson Airwrap fiyatı %15 düştü.',
  'Takip ettiğin ürünlerde 2 fiyat değişimi var.',
  'Yeni kampanya sinyali tespit edildi.',
]

export function DashboardLayout({ children }) {
  const navigate = useNavigate()
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [topBarNotice, setTopBarNotice] = useState('')
  const drawerRef = useRef(null)
  const menuButtonRef = useRef(null)

  function closeMobileNavigation() {
    setIsMobileNavigationOpen(false)
    menuButtonRef.current?.querySelector('button')?.focus()
  }

  function openRoute(route) {
    navigate(route)
    setIsNotificationOpen(false)
    setIsProfileOpen(false)
    setIsSearchOpen(false)
  }

  const visibleSearchItems = mockSearchItems.filter(([label]) => (
    label.toLocaleLowerCase('tr-TR').includes(searchTerm.toLocaleLowerCase('tr-TR'))
  ))

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
            <img alt="" src={logoImage} />
            <span>{siteConfig.name}</span>
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
          <div className="DashboardLayout__topbarControl DashboardLayout__topbarControl--search">
            <button
              aria-controls="dashboard-search-panel"
              aria-expanded={isSearchOpen}
              className="DashboardLayout__search"
              onClick={() => setIsSearchOpen((isOpen) => !isOpen)}
              type="button"
            >
              <Search aria-hidden="true" />
              <span>Ürün, mağaza veya teklif ara</span>
            </button>
            {isSearchOpen ? (
              <div className="DashboardLayout__panel" id="dashboard-search-panel">
                <label className="DashboardLayout__panelLabel" htmlFor="dashboard-search">ShopIQ demo içeriğinde ara</label>
                <input autoFocus id="dashboard-search" onChange={(event) => setSearchTerm(event.target.value)} placeholder="Dashboard içeriğinde ara" type="search" value={searchTerm} />
                <ul className="DashboardLayout__panelList">
                  {visibleSearchItems.map(([label, route]) => <li key={label}><button onClick={() => openRoute(route)} type="button">{label}</button></li>)}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="DashboardLayout__topbarControl">
            <Button aria-controls="dashboard-notification-panel" aria-expanded={isNotificationOpen} aria-label="Bildirimleri aç" icon={<Bell />} onClick={() => setIsNotificationOpen((isOpen) => !isOpen)} variant="ghost" />
            {isNotificationOpen ? (
              <div className="DashboardLayout__panel" id="dashboard-notification-panel">
                <span className="DashboardLayout__panelLabel">Demo bildirimler</span>
                <ul className="DashboardLayout__panelList">
                  {mockNotifications.map((notification) => <li key={notification}><button onClick={() => openRoute(APP_ROUTES.TRACKING)} type="button">{notification}</button></li>)}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="DashboardLayout__topbarControl">
            <Button aria-controls="dashboard-profile-panel" aria-expanded={isProfileOpen} aria-label="Profil menüsünü aç" icon={<CircleUserRound />} onClick={() => setIsProfileOpen((isOpen) => !isOpen)} variant="ghost" />
            {isProfileOpen ? (
              <div className="DashboardLayout__panel" id="dashboard-profile-panel">
                <span className="DashboardLayout__panelLabel">ShopIQ hesap menüsü</span>
                <ul className="DashboardLayout__panelList">
                  <li><button onClick={() => setTopBarNotice('Profil alanı demo aşamasında.') } type="button"><UserRound aria-hidden="true" />Profil</button></li>
                  <li><button onClick={() => setTopBarNotice('Ayarlar alanı demo aşamasında.') } type="button"><Settings aria-hidden="true" />Ayarlar</button></li>
                  <li><button onClick={() => openRoute(APP_ROUTES.ONBOARDING)} type="button"><LogOut aria-hidden="true" />Çıkış Yap</button></li>
                </ul>
              </div>
            ) : null}
          </div>
        </header>
        {topBarNotice ? <p className="DashboardLayout__notice" role="status">{topBarNotice}</p> : null}
        {children}
      </div>
    </div>
  )
}
