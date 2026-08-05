import { LoaderCircle } from 'lucide-react'
import './Button.css'

export function Button({
  children,
  className = '',
  disabled = false,
  icon,
  isLoading = false,
  type = 'button',
  variant = 'primary',
  ...buttonProps
}) {
  const isDisabled = disabled || isLoading
  const buttonClassName = ['Button', `Button--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      {...buttonProps}
      aria-busy={isLoading || undefined}
      className={buttonClassName}
      disabled={isDisabled}
      type={type}
    >
      <span className="Button__content">
        {icon ? <span className="Button__icon" aria-hidden="true">{icon}</span> : null}
        {children}
      </span>
      {isLoading ? (
        <LoaderCircle className="Button__spinner" aria-hidden="true" />
      ) : null}
    </button>
  )
}
