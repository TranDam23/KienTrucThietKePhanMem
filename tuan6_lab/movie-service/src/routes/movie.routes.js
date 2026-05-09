const router =
    require("express").Router();

const Movie =
    require("../models/Movie");

router.get(
    "/",
    async (req, res) => {

        const movies =
            await Movie.find();

        res.json(movies);
    }
);

router.post(
    "/",
    async (req, res) => {

        const movie =
            await Movie.create(
                req.body
            );

        res.json(movie);
    }
);

module.exports = router;