import { ChevronDown } from 'lucide-react'
import { PageContainer } from '../../../../shared/ui/index.js'
import './Faq.css'

const questions = [
  {
    answer:
      'ShopIQ; ürün takibi, fiyat değişimlerini görme, teklif karşılaştırma ve alışveriş karar desteğini aynı deneyimde bir araya getirir.',
    question: 'ShopIQ ne işe yarar?',
  },
  {
    answer:
      'Ürün bağlantısını ekledikten sonra ShopIQ ürünün fiyat hareketlerini ve teklifler arasındaki durumu takip deneyiminde gösterir.',
    question: 'Ürün takibi nasıl çalışır?',
  },
  {
    answer:
      'Dashboard üzerinde fiyatı düşen ürünleri, fırsatları ve demo bildirimleri görebilirsiniz. Gerçek bildirim servisi backend entegrasyonu ile çalışacaktır.',
    question: 'Fiyat düştüğünde nasıl haberdar olurum?',
  },
  {
    answer:
      'Evet. Tekliflerin ürün fiyatı, kargo ve mağaza güveni gibi bilgilerini tek ekranda karşılaştırabilirsiniz.',
    question: 'Ürünleri karşılaştırabilir miyim?',
  },
  {
    answer:
      'Bu frontend deneyiminde mağaza bilgileri ve fiyat hareketleri demo verileriyle gösterilir. Gerçek mağaza entegrasyonları ayrıca bağlanacaktır.',
    question: 'ShopIQ hangi mağazaları destekliyor?',
  },
  {
    answer:
      'AI Assistant, ürün fiyatı, teklif ve takip bağlamını daha bilinçli değerlendirmen için karar desteği sunar; ShopIQ’nun ana ürünü ürün takibi ve fırsat yönetimidir.',
    question: 'AI Assistant ne işe yarıyor?',
  },
]

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="Faq" id="faq">
      <PageContainer>
        <div className="Faq__heading">
          <h2 id="faq-title">Sık sorulan sorular</h2>
          <p>ShopIQ’nun takip, fırsat ve karşılaştırma deneyimi hakkında kısa cevaplar.</p>
        </div>
        <div className="Faq__list">
          {questions.map(({ answer, question }) => (
            <details className="Faq__item" key={question}>
              <summary>
                <span>{question}</span>
                <ChevronDown aria-hidden="true" className="Faq__icon" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
