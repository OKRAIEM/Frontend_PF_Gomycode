// index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import store from './Redux/Store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Créer la racine de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Provider pour Redux */}
    <Provider store={store}>
      {/* BrowserRouter pour les routes */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
