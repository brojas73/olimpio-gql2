import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom';
import { TareasExternasProvider } from './context/TareasExternasContext';
import { AuthProvider } from './hooks/useAuth';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tareasExternasActivasByOrigen: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

const customFetch =  (uri, options) => {
  return fetch(uri, options)
          .then(response => {
            if (response.status >= 500) {
              return Promise.reject(response.status)
            }
            return response
          })
}


// Configuración de ApolloClient
const client = new ApolloClient({
  link: createHttpLink({
    uri: (process.env.NODE_ENV === 'development') ? 'http://localhost:3010/graphql' : 'http://5.183.8.10/graphql',
    fetch: customFetch,
  }),
  cache
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AuthProvider>
        <TareasExternasProvider>
          <App />
        </TareasExternasProvider>
      </AuthProvider>
    </BrowserRouter>
  </ApolloProvider>
)
