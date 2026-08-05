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
      'MVP sürümünde ürün bağlantısı ile karşılaştırma yapılır. Kullanıcı hesabı oluşturmanız gerekmez.',
    question: 'Karşılaştırma için hesap oluşturmam gerekir mi?',
  },
  {
    answer:
      'ShopIQ, karşılaştırma sonucunda ürün için uygun mağaza tekliflerini göstermek üzere tasarlanmıştır.',
    question: 'ShopIQ hangi bilgileri karşılaştırır?',
  },
  {
    answer:
      'Size uygun teklifi seçtiğinizde ilgili mağazaya yönlendirilirsiniz.',
    question: 'Bir teklif seçtiğimde ne olur?',
  },
  {
    answer:
      'Fiyat alarmı ve takip özellikleri gelecekteki geliştirme planındadır; MVP kapsamına dahil değildir.',
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
