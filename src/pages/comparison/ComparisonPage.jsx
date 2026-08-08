import { DashboardOverview } from '../../widgets/dashboard-overview/DashboardOverview.jsx'
const items=[{label:'Son karşılaştırma',title:'En uygun teklif',detail:'Mağaza, kargo ve kampanyayı birlikte değerlendir.'},{label:'Karşılaştırma geçmişi',title:'8 analiz',detail:'Daha önce incelediğin tekliflere dön.'},{label:'Ürün araştır',title:'Tek linkle başla',detail:'Yeni ürünleri karşılaştırma akışına ekle.'}]
export function ComparisonPage(){return <DashboardOverview title="Karşılaştır" description="Tüm teklifleri doğru karar için tek ekranda incele." items={items}/>}
