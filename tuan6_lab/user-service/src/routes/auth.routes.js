const router =
    require("express").Router();

const bcrypt =
    require("bcryptjs");

const jwt =
    require("jsonwebtoken");

const User =
    require("../models/User");

const {
    publishEvent
} = require("../../../shared/rabbitmq");

router.post(
    "/register",
    async (req, res) => {

        try {

            const {
                name,
                email,
                password
            } = req.body;

            const userExist =
                await User.findOne({
                    email
                });

            if (userExist) {

                return res.status(400).json({
                    message:
                        "Email already exists",
                });
            }

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            const user =
                await User.create({

                    name,

                    email,

                    password:
                        hashedPassword,
                });

            if (publishEvent) {

                await publishEvent(
                    "user.registered",
                    {
                        userId: user._id,
                        email: user.email,
                    }
                );
            }

            res.json({
                message:
                    "Register Success",
                user,
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message:
                    error.message,
            });
        }
    }
);

router.post(
    "/login",
    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;

            const user =
                await User.findOne({
                    email
                });

            if (!user) {

                return res.status(400).json({
                    message:
                        "User not found",
                });
            }

            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!isMatch) {

                return res.status(400).json({
                    message:
                        "Wrong password",
                });
            }

            const token =
                jwt.sign(
                    {
                        userId:
                            user._id,
                    },
                    process.env.JWT_SECRET
                );

            res.json({
                token,
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message:
                    error.message,
            });
        }
    }
);

module.exports = router;