import {
  ArrowUpRight,
  BellRing,
  CircleAlert,
  CircleCheck,
  History,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  assistantMockResponseDelay,
  assistantQuickActions,
  assistantQuickPrompts,
  assistantShoppingContext,
  getMockAssistantResponse,
} from '../../entities/assistant/model/assistantPrompts.js'
import { APP_ROUTES } from '../../shared/config/index.js'
import { buildProductContextUrl, readProductContext } from '../../shared/lib/productContext.js'
import { Button, PageContainer, Skeleton, StatusMessage, TextField } from '../../shared/ui/index.js'
import { DashboardLayout } from '../../widgets/dashboard-layout/DashboardLayout.jsx'
import './AssistantPage.css'

function AssistantWelcome({ onPromptSelect }) {
  return (
    <>
      <div className="AssistantPage__welcome">
        <span className="AssistantPage__eyebrow"><Sparkles aria-hidden="true" />ShopIQ karar desteği</span>
        <h2 id="assistant-welcome-title">Ne almak istediğini söyle.</h2>
        <p>ShopIQ, fiyatı ve mağaza seçeneklerini değerlendirerek daha bilinçli karar vermene yardımcı olur.</p>
      </div>
      <div className="AssistantPage__prompts" aria-label="Hazır sorular">
        {assistantQuickPrompts.map((prompt) => (
          <button className="AssistantPage__prompt" key={prompt} type="button" onClick={() => onPromptSelect(prompt)}>
            <span>{prompt}</span>
            <ArrowUpRight aria-hidden="true" />
          </button>
        ))}
      </div>
    </>
  )
}

function AssistantResponse({ response }) {
  return (
    <article className="AssistantPage__message AssistantPage__message--assistant">
      <span className="AssistantPage__messageLabel">ShopIQ demo yanıtı</span>
      <h3>Kararım</h3>
      <p>{response.decision}</p>
      <h3>Sebebi</h3>
      <p>{response.reason}</p>
      <p className="AssistantPage__messageNote">{response.note}</p>
    </article>
  )
}

function AssistantLoading() {
  return (
    <div className="AssistantPage__loading" aria-live="polite">
      <span>ShopIQ düşünüyor...</span>
      <Skeleton variant="text" />
    </div>
  )
}

function ShoppingContext({ productName }) {
  return (
    <aside className="AssistantPage__context" aria-labelledby="shopping-context-title">
      <div>
        <span className="AssistantPage__eyebrow"><ShieldCheck aria-hidden="true" />Ürün bağlamı</span>
        <h2 id="shopping-context-title">Takip edilen ürün</h2>
      </div>
      <strong>{productName}</strong>
      <dl>
        <div><dt>Güncel fiyat</dt><dd>{assistantShoppingContext.currentPrice}</dd></div>
        <div><dt>Son fiyat değişimi</dt><dd>{assistantShoppingContext.lastChange}</dd></div>
        <div><dt>Fiyat alarmı</dt><dd>{assistantShoppingContext.priceAlert}</dd></div>
      </dl>
    </aside>
  )
}

export function AssistantPage() {
  const inputRef = useRef(null)
  const responseTimerRef = useRef(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [question, setQuestion] = useState('')
  const productContext = readProductContext(searchParams)
  const productName = productContext.productName || assistantShoppingContext.productName

  useEffect(() => () => window.clearTimeout(responseTimerRef.current), [])

  function sendQuestion(nextQuestion) {
    const trimmedQuestion = nextQuestion.trim()

    if (!trimmedQuestion || isLoading) {
      return
    }

    setErrorMessage('')
    setMessages((currentMessages) => [...currentMessages, { content: trimmedQuestion, role: 'user' }])
    setQuestion('')
    setIsLoading(true)

    responseTimerRef.current = window.setTimeout(() => {
      try {
        const response = getMockAssistantResponse(trimmedQuestion)
        setMessages((currentMessages) => [
          ...currentMessages,
          { content: response, role: 'assistant' },
        ])
      } catch {
        setErrorMessage('ShopIQ önerisini şu anda hazırlayamadı.')
      } finally {
        setIsLoading(false)
      }
    }, assistantMockResponseDelay)
  }

  function handlePromptSelect(prompt) {
    sendQuestion(prompt)
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendQuestion(question)
  }

  function handleRetry() {
    setErrorMessage('')
    inputRef.current?.focus()
  }

  function handleAction(action) {
    if (action.id === 'comparison') {
      navigate(buildProductContextUrl(APP_ROUTES.COMPARISON, {
        productName,
        productUrl: productContext.productUrl,
      }))
      return
    }

    handlePromptSelect(action.label)
  }

  const hasConversation = messages.length > 0 || isLoading

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
              {hasConversation ? (
                <div className="AssistantPage__messages" aria-live="polite">
                  {messages.map((message, index) => (
                    message.role === 'user' ? (
                      <article className="AssistantPage__message AssistantPage__message--user" key={`${message.role}-${index}`}>
                        <span className="AssistantPage__messageLabel">Sen</span>
                        <p>{message.content}</p>
                      </article>
                    ) : <AssistantResponse key={`${message.role}-${index}`} response={message.content} />
                  ))}
                  {isLoading ? <AssistantLoading /> : null}
                </div>
              ) : <AssistantWelcome onPromptSelect={handlePromptSelect} />}

              {errorMessage ? (
                <StatusMessage type="error">
                  <span>{errorMessage}</span>
                  <Button icon={<CircleAlert aria-hidden="true" />} variant="ghost" onClick={handleRetry}>Tekrar dene</Button>
                </StatusMessage>
              ) : null}

              {hasConversation && !isLoading ? (
                <div className="AssistantPage__actions" aria-label="Devam eden aksiyonlar">
                  {assistantQuickActions.map((action) => (
                    <button key={action.id} type="button" onClick={() => handleAction(action)}>
                      {action.label}
                      {action.id === 'history' ? <History aria-hidden="true" /> : null}
                      {action.id === 'tracking' ? <BellRing aria-hidden="true" /> : null}
                      {action.id === 'alternatives' ? <Sparkles aria-hidden="true" /> : null}
                      {action.id === 'comparison' ? <CircleCheck aria-hidden="true" /> : null}
                    </button>
                  ))}
                </div>
              ) : null}

              <form className="AssistantPage__form" onSubmit={handleSubmit}>
                <TextField
                  disabled={isLoading}
                  id="assistant-question"
                  label="Alışveriş sorunun"
                  placeholder="Ürün veya alışveriş kararın hakkında bir şey sor..."
                  ref={inputRef}
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                />
                <Button disabled={!question.trim()} icon={<Send aria-hidden="true" />} isLoading={isLoading} type="submit">Gönder</Button>
              </form>
            </div>
            <ShoppingContext productName={productName} />
          </section>
        </PageContainer>
      </main>
    </DashboardLayout>
  )
}
