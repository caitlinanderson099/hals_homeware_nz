import { useEffect, useState } from "react";
import { FaCartPlus} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useCart } from "../../component/context/CartContext";

const LivingRoom = () => {

    const [livingRoomItems, setLivingRoomItems] = useState([]);
  

  const LivingRoomHeader = ({title, image_url}) => {
    return (
      <header className='livingroom-header' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${image_url})`}}>
        <h1>{title}</h1>
      </header>
    )
  }

  // UseEffect for living room items
     useEffect(() => {
      fetch('/PRODUCTS.json')
        .then(response => response.json())
        .then(data => {
          const livingRoomItems = data.filter(item => item.livingroom);
          setLivingRoomItems(livingRoomItems);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const LivingRoomCatalogue = () => {
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
            {livingRoomItems.length > 0 ? (
              livingRoomItems.map((item) => {
                const quantity = quantities[item.id] || 1;
                const itemPrice = parseFloat(item.price); // Ensure price is a number
                const totalPrice = (itemPrice * quantity).toFixed(2); // Calculate total price
    
                return (
                  <div key={item.id} className='product-item'>
                    <img src={item.product_images[0]} alt={item.name} 
                    onClick={() => handleItemClick(product.id)}
                    style={{ cursor: 'pointer' }}/>
                    <div className='item-details'>
                      <h2>{item.name}</h2>
                      <a>{item.category}</a>
                      <div className='price-add'>
                        <div className='quantity-counter'>
                          <button onClick={() => decreaseQuantity(item.id)}>-</button>
                          <span>{quantity}</span>
                          <button onClick={() => increaseQuantity(item.id)}>+</button>
                        </div>
                        <button className='primary' onClick={() => handleAddToCart(item, quantity)}>
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
    <div className='livingroom-products'>
      <LivingRoomHeader title={'Shop By Living Room'} image_url={'/theme-images/livingroom-theme.webp'}/>
      <LivingRoomCatalogue/>
    </div>
  )
}

export default LivingRoom;
