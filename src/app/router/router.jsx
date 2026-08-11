import { createBrowserRouter } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { LandingLayout } from '../layouts/LandingLayout.jsx'
import { ComparePage } from '../../pages/compare/ComparePage.jsx'
import { HomePage } from '../../pages/home/HomePage.jsx'
import { TrackingPage } from '../../pages/tracking/TrackingPage.jsx'
import { ComparisonPage } from '../../pages/comparison/ComparisonPage.jsx'
import { AssistantPage } from '../../pages/assistant/AssistantPage.jsx'
import { DashboardPage } from '../../pages/dashboard/DashboardPage.jsx'
import { APP_ROUTES } from '../../shared/config/index.js'

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
      {
        element: <LandingLayout />,
        children: [
          { path: APP_ROUTES.HOME, element: <HomePage /> },
          { path: APP_ROUTES.COMPARE, element: <ComparePage /> },
        ],
      },
      { path: APP_ROUTES.TRACKING, element: <TrackingPage /> },
      { path: APP_ROUTES.COMPARISON, element: <ComparisonPage /> },
      { path: APP_ROUTES.ASSISTANT, element: <AssistantPage /> },
      { path: APP_ROUTES.DASHBOARD, element: <DashboardPage /> },
    ],
  },
])
