const { initDB } = require('../config/db');
const { orderBufferQueue } = require('../config/queue');

// 1. KHÔNG DÙNG MQ (Xử lý trực tiếp - Dễ gây sập/treo máy)
exports.flashSaleNoMQ = async (req, res) => {
    const { userId } = req.body;
    console.log(`\n[Hệ thống] Nhận yêu cầu từ ${userId} (KHÔNG MQ)...`);

    try {
        const db = await initDB();

        // Giả lập DB xử lý nặng/chậm (0.5 giây mỗi request)
        await new Promise(res => setTimeout(res, 500));

        // Ghi trực tiếp vào SQLite
        await db.run(
            'INSERT INTO orders (userId, status) VALUES (?, ?)',
            [userId, 'SUCCESS_NO_MQ']
        );

        console.log(`[DB] ✅ Đã lưu đơn hàng của ${userId} trực tiếp vào SQLite.`);

        res.status(201).json({
            message: "Đặt hàng thành công trực tiếp!",
            userId
        });
    } catch (err) {
        res.status(500).json({ error: "DB quá tải hoặc lỗi!" });
    }
};

// 2. CÓ DÙNG MQ (Đã viết ở bước trước)
exports.flashSaleWithMQ = async (req, res) => {
    const { userId } = req.body;
    await orderBufferQueue.add('processFlashSale', { userId });
    res.status(202).json({ message: "Yêu cầu đã được xếp hàng xử lý!", userId });
};