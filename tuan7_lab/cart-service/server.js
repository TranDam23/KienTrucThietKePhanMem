// server.js
const express = require('express');
const cors = require('cors');
const redis = require('./redis-client');
const app = express();

app.use(cors());
app.use(express.json()); // Để đọc được body dạng JSON

// 1. API: Thêm sản phẩm vào giỏ hàng
app.post('/cart/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!userId || !productId || !quantity) {
        return res.status(400).json({ success: false, message: 'Thiếu thông tin (userId, productId, quantity)' });
    }

    try {
        // Lưu giỏ hàng vào Redis Hash: cart:{userId} -> { productId: quantity }
        // Dùng hincrby để nếu sản phẩm đã có thì cộng dồn, chưa có thì tạo mới
        await redis.hincrby(`cart:${userId}`, productId, quantity);
        res.json({ success: true, message: 'Đã thêm vào giỏ hàng thành công!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
});

// 2. API: Xem giỏ hàng của một User
app.get('/cart/:userId', async (req, res) => {
    try {
        const cart = await redis.hgetall(`cart:${req.params.userId}`);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
});

// Lắng nghe trên cổng 8082
app.listen(8082, '0.0.0.0', () => console.log('PU2 (Cart) running on 8082'));