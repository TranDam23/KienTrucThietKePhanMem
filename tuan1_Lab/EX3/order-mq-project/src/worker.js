const { Worker } = require('bullmq');
const { connection } = require('./config/queue');
const { initDB } = require('./config/db');

async function startWorker() {
    const db = await initDB();

    const worker = new Worker('FlashSaleQueue', async (job) => {
        const { userId } = job.data;

        console.log(`[Worker] 🛠️ Đang xử lý đơn hàng cho User: ${userId}`);

        // Giả lập xử lý nặng (0.5s) để thấy vai trò của Buffer
        await new Promise(res => setTimeout(res, 500));

        // Lưu vào SQLite
        await db.run(
            'INSERT INTO orders (userId, status) VALUES (?, ?)',
            [userId, 'SUCCESS']
        );

        console.log(`[DB] ✅ Đã lưu đơn hàng của User ${userId} vào SQLite.`);
    }, {
        connection,
        concurrency: 2 // Chỉ cho phép xử lý 2 đơn cùng lúc để bảo vệ DB
    });
}

startWorker();