import './Skeleton.css'

export function Skeleton({ className = '', variant = 'text', ...skeletonProps }) {
  const skeletonClassName = ['Skeleton', `Skeleton--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      {...skeletonProps}
      aria-label="Yükleniyor"
      className={skeletonClassName}
      role="status"
    />
  )
}
