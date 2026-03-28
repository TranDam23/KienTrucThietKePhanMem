// payment-service/index.js
const express = require('express');
const { sql, pool, poolConnect } = require('./db');

const app = express();
app.use(express.json());

app.post('/payments', async (req, res) => {
    await poolConnect;

    const { orderId, amount } = req.body;

    try {
        await pool.request()
            .input('orderId', sql.Int, orderId)
            .input('amount', sql.Decimal(10,2), amount)
            .query(`
                INSERT INTO Payments (OrderId, Amount, Status)
                VALUES (@orderId, @amount, 'PAID')
            `);

        res.json({ message: 'Payment success' });

    } catch (err) {
        res.status(500).send('Payment error');
    }
});

app.listen(3002, () => console.log('Payment Service running'));