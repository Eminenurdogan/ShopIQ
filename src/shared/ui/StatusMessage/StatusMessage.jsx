import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react'
import './StatusMessage.css'

const statusIcons = {
  error: CircleAlert,
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
}

export function StatusMessage({ children, className = '', type = 'info' }) {
  const statusType = statusIcons[type] ? type : 'info'
  const Icon = statusIcons[statusType]
  const statusClassName = ['StatusMessage', `StatusMessage--${statusType}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      aria-live={statusType === 'error' ? 'assertive' : 'polite'}
      className={statusClassName}
      role={statusType === 'error' ? 'alert' : 'status'}
    >
      <Icon className="StatusMessage__icon" aria-hidden="true" />
      <div className="StatusMessage__content">{children}</div>
    </div>
  )
}
