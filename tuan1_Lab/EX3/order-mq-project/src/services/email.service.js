const sendEmail = async (orderId) => {
    console.log(`[Email] Đang chuẩn bị gửi email cho đơn hàng: ${orderId}...`);
    // Giả lập độ trễ 4 giây
    await new Promise(resolve => setTimeout(resolve, 4000));
    console.log(`[Email] Đã gửi email xác nhận cho đơn hàng: ${orderId} thành công!`);
};

module.exports = { sendEmail };