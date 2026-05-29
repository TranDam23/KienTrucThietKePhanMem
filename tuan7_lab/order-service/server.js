// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Dùng để gọi API sang Service khác
const redis = require('./redis-client');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/checkout', async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'Thiếu userId' });
    }

    try {
        // 1. Lấy Giỏ hàng từ Data Grid (Redis)
        const cart = await redis.hgetall(`cart:${userId}`);

        if (Object.keys(cart).length === 0) {
            return res.status(400).json({ success: false, message: 'Giỏ hàng trống!' });
        }

        // Lấy sản phẩm đầu tiên trong giỏ để xử lý (Bài toán Flash Sale đơn giản hóa)
        const productId = Object.keys(cart)[0];
        const quantity = cart[productId];

        console.log(`Đang xử lý đơn hàng cho User: ${userId}, Sản phẩm: ${productId}, Số lượng: ${quantity}`);

        // 2. GỌI API SANG PU4 (INVENTORY) ĐỂ TRỪ KHO
        // (Chú ý: Đang test local nên dùng localhost:8084)
        const inventoryRes = await axios.post('http://localhost:8084/stock/deduct', {
            productId: productId,
            quantity: quantity
        });

        // 3. Nếu trừ kho thành công
        if (inventoryRes.data.success) {
            // Xóa giỏ hàng sau khi mua xong
            await redis.del(`cart:${userId}`);

            // Tạo mã đơn hàng ảo trả về cho Frontend
            const orderId = `ORD-${Date.now()}`;

            res.json({
                success: true,
                orderId: orderId,
                message: 'Mua hàng thành công! Đã trừ tồn kho.'
            });
        }
    } catch (error) {
        // Bắt lỗi nếu PU4 trả về 400 (Hết hàng) hoặc PU4 bị sập
        if (error.response && error.response.status === 400) {
            res.status(400).json({ success: false, message: 'Rất tiếc, sản phẩm đã hết hàng!' });
        } else {
            console.error(error);
            res.status(500).json({ success: false, message: 'Lỗi hệ thống hoặc Inventory Service không phản hồi.' });
        }
    }
});

// Lắng nghe trên cổng 8083
app.listen(8083, '0.0.0.0', () => console.log('PU3 (Order) running on 8083'));