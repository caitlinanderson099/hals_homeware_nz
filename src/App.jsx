import './App.css'
import { HashRouter, Link } from "react-router-dom"
import Links from './routes/Links'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import { CartProvider } from "./component/context/CartContext";


const App = () => {
  

  return (
    <>
      <HashRouter>
      <CartProvider>
        <Navbar/>
        <Links/>
        <Footer/>
        </CartProvider>
      </HashRouter>
    </>
  )
}

export default App
