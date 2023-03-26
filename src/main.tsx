import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouterComponent from "./router/RouterComponent";
import store from "./store";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://4ec300470b6147c492e5afcb30602d91@o4504893794287616.ingest.sentry.io/4504893794353152",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="dev-c8vybwj64p8pklc8.us.auth0.com"
        clientId="m4054I2v2MDayQt1HLXph0ffX3JARW93"
        redirectUri={window.location.origin}
        // audience="https://rsolar.auth0.com/api/v2/"
        scope="read:users update:current_user_metadata "
        cacheLocation="localstorage"
      >
        {/* <RouterProvider router={router} /> */}
        <RouterComponent />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);
