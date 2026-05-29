// pu4.js
const express = require('express');
const cors = require('cors');
const redis = require('./redis-client');
const app = express();

app.use(cors());
app.use(express.json());

const deductScript = `
    local stock = tonumber(redis.call('get', KEYS[1]))
    local qty = tonumber(ARGV[1])
    if stock and stock >= qty then
        redis.call('decrby', KEYS[1], qty)
        return 1
    else return 0 end
`;

app.post('/stock/deduct', async (req, res) => {
    const { productId, quantity } = req.body;
    const result = await redis.eval(deductScript, 1, `stock:${productId}`, quantity);
    if (result === 1) res.json({ success: true });
    else res.status(400).json({ success: false, message: 'Hết hàng' });
});
app.get('/stock/:productId', async (req, res) => {
    const stock = await redis.get(`stock:${req.params.productId}`);
    res.json({ stock: parseInt(stock) || 0 });
});

app.listen(8084, '0.0.0.0', () => console.log('PU4 (Inventory) running on 8084'));