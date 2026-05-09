const mongoose =
    require("mongoose");

const bookingSchema =
    new mongoose.Schema({

        userId: String,

        movieId: String,

        seats: [String],

        amount: Number,

        status: {
            type: String,
            default: "PENDING",
        },

    }, {
        timestamps: true,
    });

module.exports =
    mongoose.model(
        "Booking",
        bookingSchema
    );