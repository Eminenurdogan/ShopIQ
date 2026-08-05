import { forwardRef, useId } from 'react'
import './TextField.css'

export const TextField = forwardRef(function TextField(
  {
    className = '',
    disabled = false,
    error,
    helperText,
    id,
    label,
    type = 'text',
    ...inputProps
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const message = error || helperText
  const messageId = message ? `${inputId}-message` : undefined
  const fieldClassName = [
    'TextField',
    error ? 'TextField--error' : '',
    disabled ? 'TextField--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={fieldClassName}>
      {label ? (
        <label className="TextField__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        {...inputProps}
        ref={ref}
        aria-describedby={messageId}
        aria-invalid={error ? true : undefined}
        className="TextField__input"
        disabled={disabled}
        id={inputId}
        type={type}
      />
      {message ? (
        <p
          className="TextField__message"
          id={messageId}
          role={error ? 'alert' : undefined}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
})
