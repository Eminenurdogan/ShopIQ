import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/router.jsx'
import './app/styles/global.css'
import { APP_ERROR_MESSAGES } from './shared/constants/index.js'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error(APP_ERROR_MESSAGES.ROOT_ELEMENT_NOT_FOUND)
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
