const { sendEmail } = require("../services/email.service");
const Queue = require("bull");

// Khởi tạo Queue (MQ)
const emailQueue = new Queue("email-sending", "redis://127.0.0.1:6379");

// Xử lý MQ ngầm
emailQueue.process(async (job) => {
    await sendEmail(job.data.orderId);
});

exports.createOrderNoMQ = async (req, res) => {
    const orderId = Math.floor(Math.random() * 1000);
    console.log(`\n[Hệ thống] Bắt đầu tạo đơn hàng ${orderId} (KHÔNG MQ)...`);

    // 1. Tạo đơn hàng ngay
    // 2. Phải đợi gửi email xong mới trả kết quả
    await sendEmail(orderId);

    res.status(201).json({
        message: "Tạo đơn hàng thành công (Đã đợi 4s để gửi email)",
        orderId
    });
};

exports.createOrderWithMQ = async (req, res) => {
    const orderId = Math.floor(Math.random() * 1000);
    console.log(`\n[Hệ thống] Bắt đầu tạo đơn hàng ${orderId} (CÓ MQ)...`);

    // 1. Tạo đơn hàng ngay
    // 2. Đẩy việc gửi email vào hàng đợi (Task Queue)
    emailQueue.add({ orderId });

    // 3. Trả kết quả ngay lập tức
    res.status(201).json({
        message: "Tạo đơn hàng thành công (Email đang được xử lý ngầm)",
        orderId
    });
};