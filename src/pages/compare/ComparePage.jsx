import { Navigate, useLocation } from 'react-router-dom'
import { APP_ROUTES } from '../../shared/config/index.js'

export function ComparePage() {
  const { search } = useLocation()

  return <Navigate replace to={`${APP_ROUTES.COMPARISON}${search}`} />
}
