import React from 'react'
// import { useEffect } from 'react'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { GlobalStyle } from './styles/global'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <>
      {/* <GlobalStyle></GlobalStyle>
      <Header></Header>
      <Main></Main>
      <Footer></Footer> */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header/>} />
        <Route path='/header' element={<Header/>} />
        <Route path='/main' element={<Main/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
