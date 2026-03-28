// shipping-service/index.js
const express = require('express');
const { sql, pool, poolConnect } = require('../db');

const app = express();
app.use(express.json());

app.post('/shipping', async (req, res) => {
    await poolConnect;

    const { orderId, address } = req.body;

    try {
        await pool.request()
            .input('orderId', sql.Int, orderId)
            .input('address', sql.NVarChar, address)
            .query(`
                INSERT INTO Shippings (OrderId, Address, Status)
                VALUES (@orderId, @address, 'SHIPPING')
            `);

        res.json({ message: 'Shipping created' });

    } catch (err) {
        res.status(500).send('Shipping error');
    }
});

app.listen(3003, () => console.log('Shipping Service running'));

app.get('/', (req, res) => {
    res.send('Shipping Service is running!');
});