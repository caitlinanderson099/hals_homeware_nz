import { useParams } from 'react-router-dom'; // Hook to access URL params
import { useEffect, useState } from 'react';

const SingleProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // State to store the product data
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for any error that occurs

  // Fetch product details using the 'id' from the URL
  useEffect(() => {
    fetch('/PRODUCTS.json') // Path to your JSON file
      .then(response => response.json())
      .then(data => {
        // Find the product that matches the 'id' from the URL
        const selectedProduct = data.find(item => item.id === String(id)); // Ensure both are strings

        if (selectedProduct) {
          setProduct(selectedProduct); // Set the product data
        } else {
          setError('Product not found'); // Handle if no product is found
        }

        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(err => {
        setError('Error fetching product data'); // Handle fetch error
        setLoading(false);
      });
  }, [id]); // Re-run when the 'id' changes

  // Show loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Show error state if product is not found or fetch failed
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='single-product'>
      <h2>{product.name}</h2>
      <img src={product.product_images[0]} alt={product.name} />
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      {/* Display more product details as needed */}
    </div>
  );
};

export default SingleProduct;
