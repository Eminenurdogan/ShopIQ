import { ArrowUpRight, Send, Sparkles } from 'lucide-react'
import { useRef, useState } from 'react'
import { assistantQuickPrompts } from '../../entities/assistant/model/assistantPrompts.js'
import { Button, PageContainer, TextField } from '../../shared/ui/index.js'
import { DashboardLayout } from '../../widgets/dashboard-layout/DashboardLayout.jsx'
import './AssistantPage.css'

export function AssistantPage() {
  const inputRef = useRef(null)
  const [question, setQuestion] = useState('')

  function handlePromptSelect(prompt) {
    setQuestion(prompt)
    inputRef.current?.focus()
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <DashboardLayout>
      <main className="AssistantPage">
        <PageContainer width="wide">
          <header className="AssistantPage__header">
            <h1>Akıllı Öneriler</h1>
            <p>Ürünler, fiyatlar ve alışveriş kararların hakkında ShopIQ’dan destek al.</p>
          </header>

          <section className="AssistantPage__workspace" aria-labelledby="assistant-welcome-title">
            <div className="AssistantPage__conversation">
              <div className="AssistantPage__welcome">
                <span className="AssistantPage__eyebrow"><Sparkles aria-hidden="true" />ShopIQ karar desteği</span>
                <h2 id="assistant-welcome-title">Ne almak istediğini söyle.</h2>
                <p>ShopIQ, fiyatı ve mağaza seçeneklerini değerlendirerek daha bilinçli karar vermene yardımcı olur.</p>
              </div>

              <div className="AssistantPage__prompts" aria-label="Hazır sorular">
                {assistantQuickPrompts.map((prompt) => (
                  <button className="AssistantPage__prompt" key={prompt} type="button" onClick={() => handlePromptSelect(prompt)}>
                    <span>{prompt}</span>
                    <ArrowUpRight aria-hidden="true" />
                  </button>
                ))}
              </div>

              <form className="AssistantPage__form" onSubmit={handleSubmit}>
                <TextField
                  id="assistant-question"
                  label="Alışveriş sorunun"
                  placeholder="Ürün veya alışveriş kararın hakkında bir şey sor..."
                  ref={inputRef}
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                />
                <Button icon={<Send aria-hidden="true" />} type="submit">Gönder</Button>
              </form>
            </div>
          </section>
        </PageContainer>
      </main>
    </DashboardLayout>
  )
}
