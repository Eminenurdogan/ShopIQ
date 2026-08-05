import './PageContainer.css'

export function PageContainer({ children, className = '', width = 'content' }) {
  const containerClassName = ['PageContainer', className].filter(Boolean).join(' ')

  return (
    <div className={containerClassName} data-width={width}>
      {children}
    </div>
  )
}
