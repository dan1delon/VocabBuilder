import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/modalContext.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ModalProvider>
    </BrowserRouter>
  </StrictMode>
);
