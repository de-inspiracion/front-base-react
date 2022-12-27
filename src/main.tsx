import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RouterProvider } from "react-router-dom";
import router from './router'
import './index.css'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
