// React Imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icon Imports
import { FaCartPlus, FaFacebookSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa';

// CartContext Import
import { useCart } from "../component/context/CartContext";


const Home = () => {

  // --------- VARIABLES & STATES --------- //

  const [featuredItems, setFeaturedItems] = useState([]);
  const [trendingItems, setTrendingItems] = useState([]);

  // -------- USEEFFECTS ---------- //

  // UseEffect for featured items
  useEffect(() => {
    fetch('/PRODUCTS.json')
      .then(response => response.json())
      .then(data => {
        // Filter items where 'featured' is true
        const featuredItems = data.filter(item => item.featured_preview);
        setFeaturedItems(featuredItems);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // UseEffect for trending items
  useEffect(() => {
      fetch('/PRODUCTS.json')
        .then(response => response.json())
        .then(data => {
          const trendingItems = data.filter(item => item.trending_preview);
          setTrendingItems(trendingItems);
        })
        .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Landing Page Header
  const LandingHeader = ({title, image_url}) => {
    const navigate = useNavigate();

    const handleCatalogue = (e) => {
      e.preventDefault();
      window.scrollTo(0,0);
      navigate('/ourcatalogue');
    }

    const handleContact = (e) => {
      e.preventDefault();
      window.scrollTo(0,0);
      navigate('/contactus');
    }

    return (
      <div className='landing' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${image_url})`}}>
        <h1>{title}</h1>
        <h2> Find everything you need in one place!</h2>
        <div className='buttons'>
          <button className='primary' onClick={handleCatalogue}>Check Out Our Catalogue</button>
          <button onClick={handleContact}>Get In Contact</button>
        </div>
      </div>
    )
  };

  // Featured Section
  const FeaturedSection = () => {
    const { addToCart } = useCart();
    const [quantities, setQuantities] = useState({});
    const navigate = useNavigate(); // Hook for navigation
  
    const increaseQuantity = (id) => {
      setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
    };
  
    const decreaseQuantity = (id) => {
      setQuantities((prev) => ({ ...prev, [id]: prev[id] > 1 ? prev[id] - 1 : 1 }));
    };
  
    const handleAddToCart = (item, quantity) => {
      const confirmation = window.confirm(`Are you sure you want to add ${quantity} ${item.name}(s) to your cart?`);
      if (confirmation) {
        addToCart(item, quantity);
      }
    };
  
    const handleItemClick = (itemId) => {
      console.log('Navigating to item with id:', itemId); // Debugging line
      navigate(`/singleproduct/${itemId}`);
    };

    const handleBestSeller = (e) => {
      e.preventDefault();
      navigate('/bestsellers');
    };
  
    return (
      <div className="featured-section">
        <h2 className="subheading">Our Best Sellers</h2>
        <div className="featured">
          {featuredItems.length > 0 ? (
            featuredItems.map((item) => {
              const quantity = quantities[item.id] || 1;
              const itemPrice = parseFloat(item.price); // Ensure price is a number
              const totalPrice = (itemPrice * quantity).toFixed(2); // Calculate total price
  
              return (
                <div 
                  key={item.id} 
                  className="product-item"
                >
                  <img src={item.product_images[0]} alt={item.name} onClick={() => handleItemClick(item.id)} // Navigate when item card is clicked
                  style={{ cursor: 'pointer' }}/>
                  <div className="item-details">
                    <h2>{item.name}</h2>
                    <a>{item.category}</a>
                    <div className="price-add">
                      <div className="quantity-counter">
                        <button onClick={() => decreaseQuantity(item.id)}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)}>+</button>
                      </div>
                      <button className="primary" onClick={() => handleAddToCart(item, quantity)}>
                        <FaCartPlus /> Add to Cart
                      </button>
                      <h4 className="price">${totalPrice}</h4> {/* Display total price */}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Loading featured items...</p>
          )}
        </div>
        <button className="primary see-more" onClick={handleBestSeller}>See More Best Sellers</button>
      </div>
    );
  };

  // Categories Section
  const CategorySection = () => {

    const navigate = useNavigate();

    const handleLivingRoom = (e) => {
      window.scrollTo(0, 0);
      e.preventDefault()
      navigate('/livingroom');
    };

    const handleBathroom = (e) => {
      window.scrollTo(0, 0);
      e.preventDefault()
      navigate('/bathroom');
    };

    const handleBedroom = (e) => {
      window.scrollTo(0, 0);
      e.preventDefault()
      navigate('/bedroom');
    };

    const handleKitchen = (e) => {
      window.scrollTo(0, 0);
      e.preventDefault()
      navigate('/kitchen');
    };

    return (
      <div className='categories-section'>
        <h2 className='subheading'>Shop By Room</h2>
        <div className='shop-by-cards'>
          <div className='shop-by-card'>
            <img src="/theme-images/bedroom-theme.webp" alt="" />
            <a onClick={handleBedroom}>Shop Bedroom</a>
          </div>

          <div className='shop-by-card'>
            <img src="/theme-images/bathroom-theme.webp" alt="" />
            <a onClick={handleBathroom}>Shop Bathroom</a>
          </div>

          <div className='shop-by-card'>
            <img src="/theme-images/kitchen-theme.webp" alt="" />
            <a onClick={handleKitchen}>Shop Kitchen</a>
          </div>

          <div className='shop-by-card'>
            <img src="/theme-images/livingroom-theme.webp" alt="" />
            <a onClick={handleLivingRoom}>Shop Living Room</a>
          </div>
        </div>
      </div>
    )
  };

  // Trending Section
  const TrendingSection = () => {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  
  const increaseQuantity = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] > 1 ? prev[id] - 1 : 1 }));
  };

  const handleAddToCart = (item, quantity) => {
    const confirmation = window.confirm(`Are you sure you want to add ${quantity} ${item.name}(s) to your cart?`);
    if (confirmation) {
      addToCart(item, quantity);
    }
  };

  const handleTrending = (e) => {
    e.preventDefault();
    window.scrollTo(0,0);
    navigate('/trending');
  };

  return (
    <div className="trending-section">
      <h2 className="subheading">What's Trending?</h2>
      <div className="trending">
        {trendingItems.length > 0 ? (
          trendingItems.map((item) => {
            const quantity = quantities[item.id] || 1;
            const price = parseFloat(item.price) || 0; // Convert price to a number
            const totalPrice = (price * quantity).toFixed(2); // Calculate total price

            return (
              <div key={item.id} className="product-item">
                <img src={item.product_images[0]} alt={item.name} />
                <div className="item-details">
                  <h2>{item.name}</h2>
                  <a>{item.category}</a>
                  <div className="price-add">
                    <div className="quantity-counter">
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                    <button 
                      className="primary" 
                      onClick={() => handleAddToCart(item, quantity)}
                    >
                      <FaCartPlus /> Add to Cart
                    </button>
                    <h4 className="price">${totalPrice}</h4> {/* Display updated total price */}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading trending items...</p>
        )}
      </div>
      <button className="primary see-more" onClick={handleTrending}>See More Trending</button>
    </div>
  );
  };

  // Contact / Location Section
  const LocationSection = () => {
    return (
      <div className='location-section'>
        <h2 className='subheading'>Where you can find us</h2>
        <div className='contact-location-cont'>
          <div className='contact-info'>
            <img src="/logos/hals-logo3.png" width="200" height="200" alt="" />

            <div className='contact-group'>
              <h3>Head Office:</h3>
              <p>2 Carmont Place Building, Mount Wellington, Auckland 1060 New Zealand</p>
            </div>

            <div className='contact-group'>
              <h3>Phone:</h3>
              <p>+64 457 4957</p>
            </div>

            <div className='contact-group'>
              <h3>Email:</h3>
              <p>contact@halshomeware.co.nz</p>
            </div>

            <div className='social-group'>
             <FaInstagramSquare/>
             <FaFacebookSquare/>
             <FaLinkedin/>
            </div>

          </div>
          <div className='location'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1711.185361198904!2d174.8439445047445!3d-36.92492750423262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d494dbb9eac91%3A0xbdc98bd5e5c6ba56!2s2%20Carmont%20Place%2C%20Mount%20Wellington%2C%20Auckland%201060!5e0!3m2!1sen!2snz!4v1740606292286!5m2!1sen!2snz" width="600" height="400"></iframe>
          </div>
        </div>
      </div>
    )
  };

  // -------- MASTER RETURN ---------- //
  return (
    <div className='home-page'>
      <LandingHeader title={"Hal's Homeware NZ"} image_url={'/bg-images/home-bg.webp'}/>
      <FeaturedSection/>
      <CategorySection/>
      <TrendingSection/>
      <LocationSection/>
    </div>
  );

};

export default Home;