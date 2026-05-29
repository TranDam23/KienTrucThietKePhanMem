// Thay vì gọi "new Redis(...)", ta import file redis-client.js vừa tạo
const redis = require('./redis-client'); 

async function seedData() {
    console.log('Đang kết nối để bơm dữ liệu lên Redis Online...');
    
    // Lưu thông tin sản phẩm
    await redis.hset('product:1', { id: 1, name: 'iPhone 15 Pro Max', price: 1000 });
    await redis.hset('product:2', { id: 2, name: 'Ipad', price: 3500 });
    await redis.hset('product:3', { id: 3, name: 'Tai nghe samsum', price: 500 });
    await redis.hset('product:4', { id: 4, name: 'Samsum galaxy', price: 2500 });
    
    // Lưu số lượng tồn kho
    await redis.set('stock:1', 50); 
    await redis.set('stock:2', 50); 
    await redis.set('stock:3', 50); 
    await redis.set('stock:4', 50); 
    
    console.log('✅ Đã nạp dữ liệu sản phẩm và kho lên Data Grid thành công!');
    process.exit();
}

seedData();