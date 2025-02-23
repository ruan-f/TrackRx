import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-dtie426q7e5vtlk3.us.auth0.com"
    clientId="Ys6mDeAnm2L1JGDxeUR1jcvvUSok0Okg"
    authorizationParams={{
      redirect_uri: localhost:3000
    }}
  >
    <App />
  </Auth0Provider>,
);