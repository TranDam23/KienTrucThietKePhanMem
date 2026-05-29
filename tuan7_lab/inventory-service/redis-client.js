const Redis = require('ioredis');

// Dán URL của Redis Online vào đây (nhớ có rediss://)
const redisUri = 'redis://default:H6UNgtfJDEeHxBGkfDmOZNMy9xS2pO1l@redis-13462.crce305.ap-seast-1-1.ec2.cloud.redislabs.com:13462';

const redis = new Redis(redisUri);

module.exports = redis;