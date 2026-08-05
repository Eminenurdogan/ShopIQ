import { createBrowserRouter } from 'react-router-dom'
import App from '../../App.jsx'
import { ComparePage } from '../../pages/compare/ComparePage.jsx'
import { HomePage } from '../../pages/home/HomePage.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'compare',
        element: <ComparePage />,
      },
    ],
  },
])
