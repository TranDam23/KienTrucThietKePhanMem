// pu1-product.js
const express = require('express');
const cors = require('cors'); // 1. KHAI BÁO THÊM CORS Ở ĐÂY
const redis = require('./redis-client');
const app = express();

app.use(cors()); // 2. BẬT CORS LÊN (Phải đặt trước các API)
app.use(express.json());

// Lấy danh sách sản phẩm (Trong thực tế có thể dùng Sets/Hashes kết hợp)
app.get('/products', async (req, res) => {
    try {
        // Lấy tất cả key product
        const productKeys = await redis.keys('product:*');

        const products = [];

        for (const key of productKeys) {
            const product = await redis.hgetall(key);

            // lấy stock
            const stock = await redis.get(`stock:${product.id}`);

            products.push({
                id: product.id,
                name: product.name,
                price: Number(product.price),
                stock: Number(stock)
            });
        }

        res.json(products);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Lỗi lấy sản phẩm'
        });
    }
});

app.get('/products/:id', async (req, res) => {
    const product = await redis.hgetall(`product:${req.params.id}`);
    res.json(product);
});

// 3. THÊM '0.0.0.0' VÀO ĐỂ CÁC MÁY KHÁC TRONG LAN CÓ THỂ GỌI ĐƯỢC
app.listen(8081, '0.0.0.0', () => console.log('PU1 Product Service running on 8081'));