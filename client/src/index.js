import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
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

// Configuración de ApolloClient
const client = new ApolloClient({
  uri: 'http://localhost:3010/graphql',
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
