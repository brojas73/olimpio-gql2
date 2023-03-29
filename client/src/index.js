import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { TareasExternasProvider } from './context/TareasExternasContext';
import { AuthProvider } from './hooks/useAuth';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TareasExternasProvider>
          <App />
        </TareasExternasProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
