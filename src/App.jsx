import { Outlet } from 'react-router-dom'
import { SiteHeader } from './widgets/site-header/index.js'

function App() {
  return (
    <div className="AppLayout">
      <SiteHeader />
      <main className="AppLayout__main">
        <Outlet />
      </main>
    </div>
  )
}

export default App
