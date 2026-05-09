require("dotenv").config();

const express =
    require("express");

const cors =
    require("cors");

const axios =
    require("axios");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    "/api/auth",
    async (req, res) => {

        try {

            const response =
                await axios({

                    method:
                        req.method,

                    url:
                        `http://localhost:8081${req.originalUrl}`,

                    data:
                        req.body,
                });

            res.json(
                response.data
            );

        } catch (error) {

            res.status(500).json({
                error:
                    error.message,
            });
        }
    }
);

app.use(
    "/api/movies",
    async (req, res) => {

        try {

            const response =
                await axios({

                    method:
                        req.method,

                    url:
                        `http://localhost:8082${req.originalUrl.replace("/api/movies", "")}`,

                    data:
                        req.body,
                });

            res.json(
                response.data
            );

        } catch (error) {

            res.status(500).json({
                error:
                    error.message,
            });
        }
    }
);

app.use(
    "/api/bookings",
    async (req, res) => {

        try {

            const response =
                await axios({

                    method:
                        req.method,

                    url:
                        `http://localhost:8083${req.originalUrl.replace("/api/bookings", "")}`,

                    data:
                        req.body,
                });

            res.json(
                response.data
            );

        } catch (error) {

            res.status(500).json({
                error:
                    error.message,
            });
        }
    }
);

app.listen(
    process.env.PORT,
    () => {

        console.log(
            `Gateway Running ${process.env.PORT}`
        );
    }
);