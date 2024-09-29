import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from "@auth0/auth0-react";
import { GlobalStateProvider } from './GlobalStateContext.jsx';

const domain="dev-1x3dgd17gm4ixr5o.us.auth0.com"
const clientId="P6CgenKb7ii7mf7p8pHVR8BjUpzOwfl2"

console.log(domain)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStateProvider>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
      </GlobalStateProvider>
  </StrictMode>,
)
