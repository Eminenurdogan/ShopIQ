import { NavLink, useLocation } from 'react-router-dom'
import { APP_ROUTES } from '../../../../shared/config/index.js'
import './Navigation.css'

const navigationItems = [
  { label: 'Takiplerim', to: APP_ROUTES.TRACKING, type: 'route' },
  { label: 'Karşılaştır', to: APP_ROUTES.COMPARISON, type: 'route' },
  { label: 'Akıllı Öneriler', to: APP_ROUTES.ASSISTANT, type: 'route' },
  { label: 'Nasıl Çalışır?', to: '#how-it-works', type: 'anchor' },
  { label: 'SSS', to: '#faq', type: 'anchor' },
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
