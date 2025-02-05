import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/modalContext.jsx';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';
import Loader from './components/Loader/Loader.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ModalProvider>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <App />
          </PersistGate>
        </ModalProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
