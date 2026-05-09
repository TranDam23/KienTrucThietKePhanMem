const router =
    require("express").Router();

const Booking =
    require("../models/Booking");

const {
    publishEvent
} = require("../../../shared/rabbitmq");

router.post(
    "/",
    async (req, res) => {

        try {

            const {
                userId,
                movieId,
                seats,
                amount
            } = req.body;

            const booking =
                await Booking.create({

                    userId,

                    movieId,

                    seats,

                    amount,

                    status:
                        "PENDING",
                });

            await publishEvent(
                "booking.created",
                {
                    bookingId:
                        booking._id,

                    userId,

                    movieId,

                    seats,

                    amount,
                }
            );

            res.json({
                message:
                    "Booking Created",
                booking,
            });

        } catch (error) {

            res.status(500).json({
                error: error.message,
            });
        }
    }
);

router.get(
    "/",
    async (req, res) => {

        const bookings =
            await Booking.find();

        res.json(bookings);
    }
);

module.exports = router;