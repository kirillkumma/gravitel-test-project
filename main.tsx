import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import { App } from './app'
import { GQL_ENDPOINT } from './config'

const client = new ApolloClient({
  uri: GQL_ENDPOINT,
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
