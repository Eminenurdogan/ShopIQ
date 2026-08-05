import { ArrowDown } from 'lucide-react'
import { PageContainer } from '../../../../shared/ui/index.js'
import './HowItWorks.css'

const steps = [
  'Ürün linkini yapıştır.',
  'Sistem ürünü analiz eder.',
  'Mağazaları karşılaştırır.',
  'En uygun mağazaya git.',
]

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-title" className="HowItWorks" id="how-it-works">
      <PageContainer>
        <div className="HowItWorks__heading">
          <h2 id="how-it-works-title">Nasıl çalışır?</h2>
          <p>Karşılaştırma yolculuğu dört kısa adımda başlar.</p>
        </div>
        <ol className="HowItWorks__list">
          {steps.map((step, index) => (
            <li className="HowItWorks__item" key={step}>
              <article className="HowItWorks__step">
                <span className="HowItWorks__number">{index + 1}</span>
                <h3>{step}</h3>
              </article>
              {index < steps.length - 1 ? (
                <ArrowDown aria-hidden="true" className="HowItWorks__arrow" />
              ) : null}
            </li>
          ))}
        </ol>
      </PageContainer>
    </section>
  )
}
