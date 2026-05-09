require("dotenv").config();

const express =
    require("express");

const {
    connectRabbitMQ,
    consumeEvent,
    publishEvent,
} = require("../../shared/rabbitmq");

const app = express();

connectRabbitMQ()
.then(async () => {

    await consumeEvent(
        "payment_queue",
        "booking.created",
        async (data) => {

            console.log(
                "BOOKING_CREATED RECEIVED"
            );

            const success =
                Math.random() > 0.3;

            if (success) {

                await publishEvent(
                    "payment.completed",
                    {
                        bookingId:
                            data.bookingId,
                    }
                );

                console.log(
                    "PAYMENT_COMPLETED"
                );

            } else {

                await publishEvent(
                    "booking.failed",
                    {
                        bookingId:
                            data.bookingId,
                    }
                );

                console.log(
                    "BOOKING_FAILED"
                );
            }
        }
    );
});

app.listen(
    process.env.PORT,
    () => {

        console.log(
            `Payment Service ${process.env.PORT}`
        );
    }
);