import { ChevronDown } from 'lucide-react'
import { PageContainer } from '../../../../shared/ui/index.js'
import './Faq.css'

const questions = [
  {
    answer:
      'Ürün bağlantısını paylaşın; ShopIQ aynı ürüne ait teklifleri karşılaştırma akışında bir araya getirir.',
    question: 'ShopIQ nasıl çalışır?',
  },
  {
    answer:
      'Ürün karşılaştırmasını hesap oluşturmadan inceleyebilirsiniz. Demo hesap akışı ise takiplerinizi ve Dashboard deneyimini keşfetmenizi sağlar.',
    question: 'Karşılaştırma için hesap oluşturmam gerekir mi?',
  },
  {
    answer:
      'ShopIQ, karşılaştırma sonucunda ürün için uygun mağaza tekliflerini göstermek üzere tasarlanmıştır.',
    question: 'ShopIQ hangi bilgileri karşılaştırır?',
  },
  {
    answer:
      'Tekliflerin fiyat, kargo ve mağaza güveni bilgilerini karşılaştırabilirsiniz. Mağaza yönlendirmeleri demo aşamasında açıkça belirtilir.',
    question: 'Bir teklif seçtiğimde ne olur?',
  },
  {
    answer:
      'Dashboard üzerinden takip deneyimini, fiyat değişimlerini ve demo bildirimleri inceleyebilirsiniz. Gerçek bildirim servisi backend entegrasyonu ile eklenecektir.',
    question: 'Fiyat alarmı oluşturabilir miyim?',
  },
]

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="Faq" id="faq">
      <PageContainer>
        <div className="Faq__heading">
          <h2 id="faq-title">Sık sorulan sorular</h2>
          <p>ShopIQ’nun temel karşılaştırma deneyimi hakkında kısa cevaplar.</p>
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
