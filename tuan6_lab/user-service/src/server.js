require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const authRoutes =
    require("./routes/auth.routes");

const {
    connectRabbitMQ
} = require("../../shared/rabbitmq");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE"
    ],
    credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {

    res.json({
        message: "User Service Running",
    });
});

app.use(
    "/api/auth",
    authRoutes
);

const startServer = async () => {

    try {

        await mongoose.connect(
            process.env.MONGO_URL
        );

        console.log(
            "MongoDB Connected"
        );

        await connectRabbitMQ();

        console.log(
            "RabbitMQ Connected"
        );

        app.listen(
            process.env.PORT || 8081,
            () => {

                console.log(
                    `User Service Running ${process.env.PORT || 8081}`
                );
            }
        );

    } catch (error) {

        console.log(
            "SERVER ERROR:",
            error.message
        );
    }
};

startServer();