require("dotenv").config();

const express =
    require("express");

const {
    connectRabbitMQ,
    consumeEvent,
} = require("../../shared/rabbitmq");

const app = express();

connectRabbitMQ()
.then(async () => {

    await consumeEvent(
        "notification_user_queue",
        "user.registered",
        async (data) => {

            console.log(
                `User ${data.email} registered`
            );
        }
    );

    await consumeEvent(
        "notification_success_queue",
        "payment.completed",
        async (data) => {

            console.log(
                `Booking ${data.bookingId} success`
            );
        }
    );

    await consumeEvent(
        "notification_failed_queue",
        "booking.failed",
        async (data) => {

            console.log(
                `Booking ${data.bookingId} failed`
            );
        }
    );
});

app.listen(
    process.env.PORT,
    () => {

        console.log(
            `Notification Service ${process.env.PORT}`
        );
    }
);