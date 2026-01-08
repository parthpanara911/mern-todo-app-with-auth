import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style/index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  {/* Enables client-side routing */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
