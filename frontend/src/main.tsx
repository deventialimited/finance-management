import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import '/public/css/style.css';
import '/public/css/satoshi.css';
// import 'jsvectormap/dist/css/jsvectormap.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 
    <Router>
      <App />
    </Router>

);
