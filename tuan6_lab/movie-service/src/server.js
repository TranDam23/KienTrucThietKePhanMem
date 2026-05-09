require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const movieRoutes =
    require("./routes/movie.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    "/api/movies",
    movieRoutes
);

mongoose.connect(
    process.env.MONGO_URL
)
.then(() => {

    console.log(
        "MongoDB Connected"
    );
})
.catch((error) => {

    console.log(
        "MongoDB Error:",
        error.message
    );
});

app.get("/", (req, res) => {

    res.json({
        service: "Movie Service Running",
    });
});

app.listen(
    process.env.PORT || 8082,
    () => {

        console.log(
            `Movie Service Running ${process.env.PORT || 8082}`
        );
    }
);