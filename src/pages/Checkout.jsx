import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../component/context/CartContext";


const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    streetAddress: ''
  });
  
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { setCart } = useCart(); // Assuming you have a function to update the cart

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.country) newErrors.country = 'Please select a country';
    if (!formData.streetAddress) newErrors.streetAddress = 'Street address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Order placed successfully!');
      
      // Clear form inputs
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        streetAddress: ''
      });
  
      // Clear cart from localStorage and context
      localStorage.removeItem('cart');
      setCart([]); // Update cart state to force re-render
      
      // Navigate back to home
      navigate('/');
    }
  };
  

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <div className='checkout-page'>
      <h2 className="subheading">Personal Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label>Email Address:</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
      
      <h2 className="subheading">Delivery Details</h2>
        <div className="form-group">
          <label>Country</label>
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">Please Select</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Australia">Australia</option>
          </select>
          {errors.country && <span className="error">{errors.country}</span>}
        </div>

        <div className="form-group">
          <label>Street Address:</label>
          <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} />
          {errors.streetAddress && <span className="error">{errors.streetAddress}</span>}
        </div>

        <button type="button" onClick={handleBack}>Return To Cart</button>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;