const { Queue, Worker } = require('bullmq');

const connection = { host: '127.0.0.1', port: 6379 };

// Queue cho bài toán 1: Gửi email
const emailQueue = new Queue('EmailQueue', { connection });

// Queue cho bài toán 2: Flash Sale (Buffer)
const orderBufferQueue = new Queue('FlashSaleQueue', { connection });

module.exports = { emailQueue, orderBufferQueue, connection };