import { createBrowserRouter } from 'react-router-dom'
import App from '../../App.jsx'
import { ComparePage } from '../../pages/compare/ComparePage.jsx'
import { HomePage } from '../../pages/home/HomePage.jsx'
import { APP_ROUTES } from '../../shared/config/index.js'

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: APP_ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: APP_ROUTES.COMPARE,
        element: <ComparePage />,
      },
    ],
  },
])
