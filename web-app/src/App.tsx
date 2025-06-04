import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import * as AuthModule from '~modules/AuthModule'
import * as ChatModule from '~modules/ChatModule'
import * as CustomizingModule from '~modules/CustomizingModule'
import * as HomeModule from '~modules/HomeModule'
import * as LayoutModule from '~modules/LayoutModule'
import * as ScrapModule from '~modules/ScrapModule'
import * as SettingsModule from '~modules/SettingsModule'
import { PATHS } from '~utils/config.utils'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <LayoutModule.Side>Sidebar</LayoutModule.Side>
        <LayoutModule.Body>
          <LayoutModule.Header>
            <SettingsModule.LanguageSwitcher />
            <AuthModule.LogoutBtn />
          </LayoutModule.Header>
          <LayoutModule.Main>
            <Outlet />
          </LayoutModule.Main>
          <LayoutModule.Footer />
        </LayoutModule.Body>
      </>
    ),
    errorElement: (
      <>
        <LayoutModule.Side>Sidebar</LayoutModule.Side>
        <LayoutModule.Body>
          <LayoutModule.Header>
            <AuthModule.ProfileBtn />
            <AuthModule.LogoutBtn />
          </LayoutModule.Header>
          <LayoutModule.Main>
            <LayoutModule.RouteError />
          </LayoutModule.Main>
          <LayoutModule.Footer />
        </LayoutModule.Body>
      </>
    ),
    children: [
      {
        path: '',
        element: (
          <HomeModule.Homepage>
            <ChatModule.ChatProvider>
              {(props) => (
                <>
                  <ChatModule.SourceDataContainer {...props} />
                  <ChatModule.DialogueContainer {...props} />
                </>
              )}
            </ChatModule.ChatProvider>
          </HomeModule.Homepage>
        ),
      },
      {
        path: PATHS.CUSTOMIZATION,
        element: <CustomizingModule.CustomizingContainer />,
      },
      {
        path: PATHS.CHATBOT,
        element: (
          <ChatModule.ChatbotProvider>
            <Outlet />
          </ChatModule.ChatbotProvider>
        ),
        children: [
          {
            path: ':uuid',
            element: <ChatModule.ChatbotContainer />,
          },
        ],
      },
      {
        path: PATHS.SCRAP,
        element: <ScrapModule.ScrapContainer />,
      },
    ],
  },
])

/**
 * App
 * @description
 * App container
 *
 */
function App() {
  return (
    <AuthModule.LoginContainer>
      <RouterProvider router={router} />
    </AuthModule.LoginContainer>
  )
}

export default App
