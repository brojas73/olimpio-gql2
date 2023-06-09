import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query';

import { toast } from 'react-toastify'

import { AuthProvider } from './hooks/useAuth';

import { OlimpioProvider } from './context/OlimpioContext';
import { TareasExternasProvider } from './context/TareasExternasContext';
import { ServiciosDomicilioProvider } from './context/ServiciosDomicilioContext';
import { ConsultasProvider } from './context/ConsultasContext';
import { TareasLocalesProvider } from './context/TareasLocalesContext';

const mutationCache = new MutationCache({
  onError: (error) => {
    toast.error(error.message)
  }
})

const queryClient = new QueryClient({ 
  mutationCache, 
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.data !== undefined) {
        toast.error(`Error: No puedo cotactar al servidor`)
      } else {
        toast.error(error.message)
      }
    }
  })
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OlimpioProvider>
          <TareasLocalesProvider>
            <ServiciosDomicilioProvider>
              <TareasExternasProvider>
                <ConsultasProvider>
                  <App />
                </ConsultasProvider>
              </TareasExternasProvider>
            </ServiciosDomicilioProvider>
          </TareasLocalesProvider>
        </OlimpioProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
