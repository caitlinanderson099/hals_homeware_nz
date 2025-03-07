import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa6';
import { useCart } from "../component/context/CartContext"; // Import the cart context


const Catalogue = () => {

  const [products, setProducts] = useState([]);

   // UseEffect for products
    useEffect(() => {
      fetch('/PRODUCTS.json')
        .then(response => response.json())
        .then(data => {
          const products = data.filter(item => item);
          setProducts(products);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

  const CatalogueHeader = ({title, image_url}) => {
    return (
      <header className='catalogue-header' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${image_url})`}}>
        <h1>{title}</h1>
      </header>
    )
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

  const CatalogueProducts = () => {
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
  
    return (
      <div className='catalogue-section'>
        <h2 className='subheading'>Shop Our Catalogue</h2>
        <div className='catalogue-cont'>
          {products.length > 0 ? (
            products.map((product) => {
              const quantity = quantities[product.id] || 1;
              const itemPrice = parseFloat(product.price); // Ensure price is a number
              const totalPrice = (itemPrice * quantity).toFixed(2); // Calculate total price
  
              return (
                <div key={product.id} className='product-item'>
                  <img src={product.product_images[0]} alt={product.name} 
                  onClick={() => handleItemClick(product.id)}
                  style={{ cursor: 'pointer' }}/>
                  <div className='item-details'>
                    <h2>{product.name}</h2>
                    <a>{product.category}</a>
                    <div className='price-add'>
                      <div className='quantity-counter'>
                        <button onClick={() => decreaseQuantity(product.id)}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => increaseQuantity(product.id)}>+</button>
                      </div>
                      <button className='primary' onClick={() => handleAddToCart(product, quantity)}>
                        <FaCartPlus /> Add to Cart
                      </button>
                      <h4 className='price'>${totalPrice}</h4> {/* Display total price */}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Loading catalogue items...</p>
          )}
        </div>
      </div>
    );
};

  return (
    <div className='catalogue-page'>
      <CatalogueHeader title={'Our Catalogue'} image_url={'/bg-images/catalogue-bg.webp'}/>
      <CategorySection/>
      <CatalogueProducts/>
    </div>
  )
}

export default Catalogue
