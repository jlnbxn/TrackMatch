import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import reportWebVitals from './reportWebVitals';
import SpotifyContextProvider from './contexts/SpotifyContext';
import AppleMusicContextProvider from './contexts/AppleMusicContext';
import Router from './Router';
import { GlobalStyles } from './styles/GlobalStyles';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <AppleMusicContextProvider>
          <SpotifyContextProvider>
            <GlobalStyles />
            <Router />
          </SpotifyContextProvider>
        </AppleMusicContextProvider>
      </HelmetProvider>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
