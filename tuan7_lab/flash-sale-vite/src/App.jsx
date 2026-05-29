import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Thông tin API (Đang test local)
// Khi chia 5 máy, bạn đổi 'localhost' thành IP của các bạn tương ứng nhé.
const API_PRODUCT = 'http://localhost:8081/products';
const API_CART_ADD = 'http://localhost:8082/cart/add';
const API_CART_GET = 'http://localhost:8082/cart';
const API_CHECKOUT = 'http://localhost:8083/checkout';

const USER_ID = 'user_123';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_PRODUCT);
      setProducts(res.data);
    } catch (error) {
      console.error('Lỗi tải sản phẩm:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_CART_GET}/${USER_ID}`);
      setCart(res.data);
    } catch (error) {
      console.error('Lỗi tải giỏ hàng:', error);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post(API_CART_ADD, {
        userId: USER_ID,
        productId: productId,
        quantity: 1
      });
      setMessage('✅ Đã thêm vào giỏ hàng!');
      fetchCart();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Lỗi khi thêm vào giỏ hàng');
    }
  };

  const checkout = async () => {
    setMessage('⏳ Đang xử lý đơn hàng...');
    try {
      const res = await axios.post(API_CHECKOUT, { userId: USER_ID });
      setMessage(`🎉 ${res.data.message} (Mã ĐH: ${res.data.orderId})`);
      fetchCart();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('⚠️ Rất tiếc, sản phẩm đã hết hàng!');
      } else {
        setMessage('❌ Lỗi hệ thống, vui lòng thử lại.');
      }
    }
  };

  return (
    <div className="App">
      <h1>⚡ Flash Sale Hệ Thống Space-Based ⚡</h1>

      {message && <div className="alert">{message}</div>}

      <div className="container">
        <div className="product-list">
          <h2>Danh sách sản phẩm</h2>
          {products.length > 0 ? products.map((product, index) => (
            <div key={index} className="product-card">
              <h3>{product.name || 'Sản phẩm Flash Sale'}</h3>
              <p>Giá: {product.price || 0} USD</p>
              <button onClick={() => addToCart(product.id || '1')}>
                Thêm vào giỏ
              </button>
            </div>
          )) : <p>Đang tải sản phẩm...</p>}
        </div>

        <div className="cart-section">
          <h2>🛒 Giỏ hàng của bạn</h2>
          {Object.keys(cart).length === 0 ? (
            <p>Giỏ hàng trống.</p>
          ) : (
            <div>
              <ul>
                {Object.keys(cart).map((key) => (
                  <li key={key}>
                    {
                      products.find((p) => p.id == key)?.name || 'Không tìm thấy sản phẩm'
                    }
                    {' - '}
                    Số lượng: {cart[key]}
                  </li>
                ))}
              </ul>
              <button className="checkout-btn" onClick={checkout}>
                Thanh toán ngay (Checkout)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;