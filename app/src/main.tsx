import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// The prerendered HTML in #root is for crawlers and the first paint; the client
// renders fresh over it rather than hydrating, since motion's entrance states
// differ between server and browser.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
