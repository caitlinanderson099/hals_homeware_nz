// React Router Dom Import
import { Route, Routes } from "react-router-dom"

// Main Page Imports
import Home from "../pages/Home"
import Catalogue from "../pages/Catalogue"
import Contact from "../pages/Contact"
import LoginSignup from "../pages/LoginSignup"

// Cart & Checkout Page Imports
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout"

// Shop By Page Imports
// Room themes
import Bedroom from "../pages/shopby-pages/Bedroom"
import Bathroom from "../pages/shopby-pages/Bathroom"
import Kitchen from "../pages/shopby-pages/Kitchen"
import LivingRoom from "../pages/shopby-pages/LivingRoom"
// Product themes
import BestSellers from "../pages/shopby-pages/BestSellers"
import Trending from "../pages/shopby-pages/Trending"

// Single Page Import
import SingleProduct from "../pages/SingleProduct"



const Links = () => {
  return (
    <>
      <Routes>
        {/* Main Pages */}
        <Route exact path='/' element={<Home/>}/>
        <Route path='/ourcatalogue' element={<Catalogue/>}/>
        <Route path='/contactus' element={<Contact/>}/>
        <Route path='/login-signup' element={<LoginSignup/>}/>

        {/* Cart & Checkout Pages */}
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>

        {/* Shop By Pages */}
        <Route path='/bedroom' element={<Bedroom/>}/>
        <Route path='/bathroom' element={<Bathroom/>}/>
        <Route path='/kitchen' element={<Kitchen/>}/>
        <Route path='/livingroom' element={<LivingRoom/>}/>

        {/* Product Theme Pages */}
        <Route path='/bestsellers' element={<BestSellers/>}/>
        <Route path='/trending' element={<Trending/>}/>

        {/* Single Page */}
        <Route path="/singleproduct/id" element={<SingleProduct />} />
      </Routes>
    </>
  );

};

export default Links;