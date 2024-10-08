import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
//import ReactDOM from 'react-dom';
//import './index.css';
//import './output.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import config from './config.json';
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "./assets/css/default.css";
import "./assets/css/slick.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/bootstrap.min.css";




axios.defaults.baseURL = config.apiURI;
const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      
      {/* <ErrorBoundary> */}
        <App />
      {/* </ErrorBoundary> */}
      
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
