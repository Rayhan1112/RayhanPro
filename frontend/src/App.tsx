import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { GlobalStyle } from './styles/global';
import 'react-toastify/dist/ReactToastify.css';


const Layout = () => {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter> {/* Wrap with BrowserRouter for routing */}
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Layout />}>
          {/* Render different pages as child routes */}
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
