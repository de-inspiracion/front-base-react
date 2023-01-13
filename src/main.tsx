import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Router, RouterProvider } from "react-router-dom";
import router from './router'
import './index.css'
import RouterComponent from './router/RouterComponent';
import store from './store'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider domain='rsolar.auth0.com' clientId='7SjPwqvKDTavRF21bMLFjkWymTSOIAnn' redirectUri={window.location.origin} audience='https://rsolar.auth0.com/api/v2/'
          scope="read:users update:current_user_metadata "
          >
        {/* <RouterProvider router={router} /> */}
        <RouterComponent/>
      </Auth0Provider>
    </Provider>

  </React.StrictMode>,
)
