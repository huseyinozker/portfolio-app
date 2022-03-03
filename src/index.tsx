import React from 'react';
import ReactDOM from 'react-dom';


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ApiContextProvider from './contexts/apicontext';
import App from './App';
import './index.css';
import './App.css';



ReactDOM.render(
  <React.StrictMode>
    <ApiContextProvider>
      <App />
    </ApiContextProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


