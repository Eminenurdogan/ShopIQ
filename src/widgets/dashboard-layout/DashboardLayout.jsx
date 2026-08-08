import { Bell, Bot, ChartNoAxesCombined, Heart, House, Menu, Search, Settings, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { APP_ROUTES, siteConfig } from '../../shared/config/index.js'
import { Button } from '../../shared/ui/index.js'
import './DashboardLayout.css'

const items=[['Dashboard',APP_ROUTES.DASHBOARD,House],['Ürün Takibi',APP_ROUTES.TRACKING,Bell],['Karşılaştırmalar',APP_ROUTES.COMPARISON,ChartNoAxesCombined],['AI Asistan',APP_ROUTES.ASSISTANT,Bot],['Favoriler','#',Heart],['Ayarlar','#',Settings]]
export function DashboardLayout({ children }) { const [open,setOpen]=useState(false); return <div className="DashboardLayout"><aside className={`DashboardLayout__sidebar ${open?'DashboardLayout__sidebar--open':''}`}><NavLink className="DashboardLayout__brand" to={APP_ROUTES.HOME}>{siteConfig.name}</NavLink><nav aria-label="Dashboard navigasyonu">{items.map(([label,to,Icon])=><NavLink className="DashboardLayout__link" key={label} to={to} onClick={()=>setOpen(false)}><Icon aria-hidden="true" />{label}</NavLink>)}</nav></aside><div className="DashboardLayout__main"><header className="DashboardLayout__topbar"><Button aria-label="Menüyü aç" icon={open?<X/>:<Menu/>} onClick={()=>setOpen(!open)} variant="ghost"/><div className="DashboardLayout__search"><Search aria-hidden="true"/><span>Ürün, mağaza veya teklif ara</span></div><Button aria-label="Bildirimler" icon={<Bell/>} variant="ghost"/><span className="DashboardLayout__profile" aria-label="Profil alanı" /></header>{children}</div></div> }
