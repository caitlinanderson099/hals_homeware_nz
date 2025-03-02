import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaCartPlus } from 'react-icons/fa';


const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/PRODUCTS.json')
      .then(response => {
        const foundProduct = response.data.find(p => p.id === Number(id));
        setProduct(foundProduct);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBack = (e) => {
    e.preventDefault();
    window.scrollTo(0,0);
    navigate(-1);
  };
  

  return (
    <div className='single-product'>
      <button onClick={handleBack} className='back-btn primary'>Back</button>

      <div className="single-cont">
        <div className="product-images-cont">
          <Swiper modules={[Pagination, Navigation]} pagination={{ clickable: true }} navigation spaceBetween={10} slidesPerView={1}>
            {product.product_images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`${product.name} ${index + 1}`} style={{ cursor: 'pointer' }} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="product-details">
          <h2>{product.name}</h2>
          <h3>{product.category}</h3>
          <p>{product.description}</p>
          <h4>Price: ${product.price}</h4>


          <button className='primary add-btn'>
            <FaCartPlus /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
