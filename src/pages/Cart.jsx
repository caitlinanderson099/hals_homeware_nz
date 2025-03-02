// React Import
import { useNavigate } from "react-router-dom";

// CartContext Import
import { useCart } from "../component/context/CartContext";

// Icon Imports
import { FaTrash, FaCartPlus } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";



const CartPage = () => {

  // ------ VARIABLES & STATES --------- //
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Calculate Total Price Function
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);
  };

  // HandleShop Navigation Click
  const handleShop = (e) => {
    e.preventDefault();
    navigate('/ourcatalogue');
  };

   // HandleShop Navigation Click
   const handleContinue = (e) => {
    e.preventDefault();
    navigate('/ourcatalogue');
  };

   // HandleShop Navigation Click
   const handleCheckout = (e) => {
    e.preventDefault();
    navigate('/checkout');
  };

  // -------- MASTER RETURN ---------- //
  return (
    <div className="cart-page">
      <h2 className="subheading">Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="empty-message">
        <p className="empty-message-text">Your cart is empty.</p>
          <button className="shop-btn" onClick={handleShop}><FaCartPlus/> Shop Our Catalogue</button>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map((item) => {
            const itemTotal = (parseFloat(item.price) * item.quantity).toFixed(2);

            return (
              <div key={item.id} className="cart-item">
                <img src={item.product_images[0]} alt={item.name} />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>Category: {item.category}</p>
                  <h4 className="price">${item.price} each</h4>
                  <h4 className="item-total">Total: ${itemTotal}</h4>

                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    
                  <button className="remove-btn primary" onClick={() => removeFromCart(item.id)}>
                    <FaTrash /> Remove
                  </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {cart.length > 0 && (
        <div className="cart-total">
          <h3>Total Cost: ${calculateTotalPrice()} (15% GST)</h3>
          <div>
            <button onClick={handleContinue}><FaCartPlus/> Continue Shopping</button>
            <button className="primary" onClick={handleCheckout}><BsCartCheckFill/> Proceed To Checkout</button>
          </div>
        </div>
      )}
    </div>
  );

};

export default CartPage;