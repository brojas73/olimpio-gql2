import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from './hooks/useAuth';

import { OlimpioProvider } from './context/OlimpioContext';
import { TareasExternasProvider } from './context/TareasExternasContext';
import { ServiciosDomicilioProvider } from './context/ServiciosDomicilioContext';
import { ConsultasProvider } from './context/ConsultasContext';
import { TareasLocalesProvider } from './context/TareasLocalesContext';

const queryClient = new QueryClient()

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
