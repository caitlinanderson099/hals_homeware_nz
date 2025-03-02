import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa6';
import { useCart } from "../../component/context/CartContext"; // Import the cart context


const BestSellers = () => {

      const [products, setProducts] = useState([]);
    
         // UseEffect for products
          useEffect(() => {
            fetch('/PRODUCTS.json')
              .then(response => response.json())
              .then(data => {
                const products = data.filter(item => item.featured);
                setProducts(products);
              })
              .catch(error => console.error('Error fetching data:', error));
          }, []);
      


    // Page Header
  const BestSellerHeader = ({title, image_url}) => {
    return (
      <div className='bestseller-header' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${image_url})`}}>
        <h1>{title}</h1>
        </div>
    )
  };

    // Best Seller Products
   const BestSellerProducts = () => {
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
             <h2 className='subheading'>Shop Best Sellers</h2>
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
    <div className='bestseller-page'>
        <BestSellerHeader title={'Best Sellers'} image_url={'/bg-images/bestseller-bg.jpg'}/>
        <BestSellerProducts/>
    </div>
  )
}

export default BestSellers
