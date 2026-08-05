import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Button } from '../../../../shared/ui/index.js'
import { Navigation } from '../Navigation/Navigation.jsx'
import './MobileNavigation.css'

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function MobileNavigation({ isOpen, onClose }) {
  const drawerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const drawerElement = drawerRef.current
    const focusableElements = drawerElement?.querySelectorAll(focusableSelector)
    focusableElements?.[0]?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
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
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  function handleBackdropMouseDown(event) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="MobileNavigation" onMouseDown={handleBackdropMouseDown}>
      <aside
        aria-label="Mobil navigasyon"
        aria-modal="true"
        className="MobileNavigation__drawer"
        ref={drawerRef}
        role="dialog"
      >
        <div className="MobileNavigation__header">
          <span className="MobileNavigation__title">Menü</span>
          <Button
            aria-label="Menüyü kapat"
            className="MobileNavigation__close"
            icon={<X />}
            onClick={onClose}
            variant="ghost"
          />
        </div>
        <Navigation onNavigate={onClose} variant="mobile" />
      </aside>
    </div>
  )
}
