const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    // Login để lấy accessToken và refreshToken
    app.post("/api/auth/login", controller.login);

    // Route để refresh token
    app.post("/api/auth/refreshtoken", controller.refreshToken);

    // Minh chứng phân quyền (Rule: admin, guest)
    app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
        res.status(200).send("Dữ liệu bảo mật dành cho Admin.");
    });

    app.get("/api/test/guest", [authJwt.verifyToken, authJwt.isGuest], (req, res) => {
        res.status(200).send("Dữ liệu dành cho Guest/Admin.");
    });
};