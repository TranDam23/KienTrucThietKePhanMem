const Redis = require('ioredis');

// Dán URL của Redis Online vào đây (nhớ có rediss://) 
// neu dung mang lan thi Thay IP bằng IP máy của NGƯỜI 5 (inventory-service) hoac theo de bai
//module.exports = new Redis({ host: '192.168.1.105', port: 6379 });
const redisUri = 'redis://default:H6UNgtfJDEeHxBGkfDmOZNMy9xS2pO1l@redis-13462.crce305.ap-seast-1-1.ec2.cloud.redislabs.com:13462';

const redis = new Redis(redisUri);

module.exports = redis;