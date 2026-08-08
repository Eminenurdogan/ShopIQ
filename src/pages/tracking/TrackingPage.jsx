import { DashboardOverview } from '../../widgets/dashboard-overview/DashboardOverview.jsx'
const items=[{label:'Aktif takipler',title:'12 ürün',detail:'Fiyat değişimlerini tek ekranda izle.'},{label:'Son fiyat değişimi',title:'₺1.249',detail:'Takiplerindeki son hareketleri gör.'},{label:'Bildirimler',title:'3 yeni fırsat',detail:'İndirimleri zamanında yakala.'}]
export function TrackingPage(){return <DashboardOverview title="Takiplerim" description="Ürünlerini izle, fiyat düştüğünde ilk sen öğren." items={items}/>}
