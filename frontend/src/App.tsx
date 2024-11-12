import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { GlobalStyle } from './styles/global';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <GlobalStyle />
      <Header />
      <Main />
      <Footer />
      </>
  );
}

export default App;
