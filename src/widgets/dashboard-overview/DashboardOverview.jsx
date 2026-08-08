import { PageContainer } from '../../shared/ui/index.js'
import { DashboardLayout } from '../dashboard-layout/DashboardLayout.jsx'
import './DashboardOverview.css'

export function DashboardOverview({ description, items, title }) {
  return <DashboardLayout><main className="DashboardOverview"><PageContainer width="wide"><header><p>ShopIQ</p><h1>{title}</h1><span>{description}</span></header><section aria-label={title} className="DashboardOverview__grid">{items.map((item) => <article key={item.title}><p>{item.label}</p><h2>{item.title}</h2><span>{item.detail}</span></article>)}</section></PageContainer></main></DashboardLayout>
}
