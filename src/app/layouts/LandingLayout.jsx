import { Outlet } from 'react-router-dom'
import { SiteHeader } from '../../widgets/site-header/index.js'

export function LandingLayout() {
  return (
    <div className="AppLayout">
      <SiteHeader />
      <main className="AppLayout__main">
        <Outlet />
      </main>
    </div>
  )
}
