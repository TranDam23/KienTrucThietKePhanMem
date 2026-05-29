// redis-client.js
const Redis = require('ioredis');

// URL Redis Online của bạn
const redisUri = 'redis://default:H6UNgtfJDEeHxBGkfDmOZNMy9xS2pO1l@redis-13462.crce305.ap-seast-1-1.ec2.cloud.redislabs.com:13462';

const redis = new Redis(redisUri);

module.exports = redis;