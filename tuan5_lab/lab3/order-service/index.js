// order-service/index.js
const express = require('express');
const { sql, pool, poolConnect } = require('./db');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/orders', async (req, res) => {
    await poolConnect;

    const { userId, totalAmount } = req.body;

    try {
        // 1. Insert Order
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .input('totalAmount', sql.Decimal(10,2), totalAmount)
            .query(`
                INSERT INTO Orders (UserId, TotalAmount, Status)
                OUTPUT INSERTED.Id
                VALUES (@userId, @totalAmount, 'CREATED')
            `);

        const orderId = result.recordset[0].Id;

        // 2. Call Payment Service
        await axios.post('http://localhost:3002/payments', {
            orderId,
            amount: totalAmount
        });

        // 3. Call Shipping Service
        await axios.post('http://localhost:3003/shipping', {
            orderId,
            address: "Default address"
        });

        res.json({ orderId });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating order');
    }
});

app.listen(3001, () => console.log('Order Service running'));