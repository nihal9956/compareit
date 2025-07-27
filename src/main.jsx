// main.jsx or App.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ColorModeProvider } from './theme/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ColorModeProvider>
    <App />
  </ColorModeProvider>
);
