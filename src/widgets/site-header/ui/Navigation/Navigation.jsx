import { NavLink, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { APP_ROUTES } from '../../../../shared/config/index.js'
import './Navigation.css'

const navigationItems = [
  { label: 'Özellikler', to: '#features', type: 'anchor' },
  { label: 'Nasıl Çalışır?', to: '#how-it-works', type: 'anchor' },
  { label: 'Platform', to: '#platform', type: 'anchor' },
  { label: 'Merak Ettikleriniz', to: '#faq', type: 'anchor' },
]

export function Navigation({ onNavigate, variant = 'desktop' }) {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (pathname !== APP_ROUTES.HOME || !hash) {
      return
    }

    window.requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [hash, pathname])

  return (
    <nav aria-label="Ana navigasyon" className={`Navigation Navigation--${variant}`}>
      <ul className="Navigation__list">
        {navigationItems.map((item) => {
          const isAnchor = item.type === 'anchor'
          const isActive = isAnchor ? pathname === APP_ROUTES.HOME && hash === item.to : !hash

          return (
            <li className="Navigation__item" key={item.label}>
              {isAnchor ? (
                <NavLink
                  aria-current={isActive ? 'location' : undefined}
                  className="Navigation__link"
                  onClick={onNavigate}
                  to={`${APP_ROUTES.HOME}${item.to}`}
                >
                  {item.label}
                </NavLink>
              ) : (
                <NavLink
                  className="Navigation__link"
                  end
                  onClick={onNavigate}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
