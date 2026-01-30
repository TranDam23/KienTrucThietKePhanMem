const express = require('express');
const app = express();
const flashSaleController = require('./controllers/flashsale.controller');
const orderController = require('./controllers/order.controller');
// Import hàm khởi tạo DB
const { initDB } = require('./config/db');

app.use(express.json());

// Routes Bài toán 1
app.post("/api/order/no-mq", orderController.createOrderNoMQ);
app.post("/api/order/with-mq", orderController.createOrderWithMQ);

// Routes Bài toán 2 (Flash Sale)
app.post("/api/flash-sale", flashSaleController.flashSaleWithMQ);
// Thêm route test không MQ
app.post("/api/flash-sale/no-mq", flashSaleController.flashSaleNoMQ);
// Khởi chạy Worker xử lý ngầm
// Node.js sẽ thực thi file worker.js ngay khi dòng này được gọi
require('./worker');

app.listen(8080, () => {
    console.log("🚀 Server đang chạy tại http://localhost:8080");
});

// API Minh chứng: Kiểm tra dữ liệu trong SQLite
app.get("/api/check-db", async (req, res) => {
    try {
        const db = await initDB();
        // Lấy tất cả đơn hàng, đơn mới nhất lên đầu
        const rows = await db.all("SELECT * FROM orders ORDER BY createdAt DESC");

        res.json({
            success: true,
            message: "Dữ liệu thực tế trong SQLite",
            total_orders: rows.length, // Tổng số đơn đã xử lý thành công
            data: rows
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi đọc Database",
            error: err.message
        });
    }
});