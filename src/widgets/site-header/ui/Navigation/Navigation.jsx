import { NavLink, useLocation } from 'react-router-dom'
import './Navigation.css'

const navigationItems = [
  { label: 'Özellikler', to: '#features', type: 'anchor' },
  { label: 'Nasıl Çalışır?', to: '#how-it-works', type: 'anchor' },
  { label: 'Platform', to: '#platform', type: 'anchor' },
  { label: 'Merak Ettikleriniz', to: '#faq', type: 'anchor' },
]

export function Navigation({ onNavigate, variant = 'desktop' }) {
  const { hash } = useLocation()

  return (
    <nav aria-label="Ana navigasyon" className={`Navigation Navigation--${variant}`}>
      <ul className="Navigation__list">
        {navigationItems.map((item) => {
          const isAnchor = item.type === 'anchor'
          const isActive = isAnchor ? hash === item.to : !hash

          return (
            <li className="Navigation__item" key={item.label}>
              {isAnchor ? (
                <a
                  aria-current={isActive ? 'location' : undefined}
                  className="Navigation__link"
                  href={item.to}
                  onClick={onNavigate}
                >
                  {item.label}
                </a>
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
