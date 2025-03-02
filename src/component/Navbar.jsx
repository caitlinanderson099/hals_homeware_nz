import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../component/context/CartContext"; // Import the cart context



const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { totalCartQuantity } = useCart(); // Get total quantity from context
    
        const toggleMenu = () => {
          setMenuOpen(!menuOpen);
        };
  return (
        <header>
            <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
              <a href="/" className="navbar-brand">
              <img src="/logos/hals-logo3.png" alt="Portfolio Avatar"/>
              </a>
              <button className="navbar-toggle" onClick={toggleMenu}>
                <FaBars/>
              </button>
              <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
                <a href="#ourcatalogue" onClick={() => setMenuOpen(false)}>
                  Our Catalogue
                </a>
                <a href="#contactus" onClick={() => setMenuOpen(false)}>
                  Contact Us
                </a>
                <a href="#login-signup" onClick={() => setMenuOpen(false)}>
                  Log In / Sign Up
                </a>
                <Link to="/cart" className="cart-icon"  onClick={() => setMenuOpen(false)}>
        <FaShoppingCart />
        {totalCartQuantity > 0 && <span className="cart-count">{totalCartQuantity}</span>}
      </Link>
              </div>
            </nav>
          </header>
        );
      };

export default Navbar
