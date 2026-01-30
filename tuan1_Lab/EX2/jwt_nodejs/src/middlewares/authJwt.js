const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const { TokenExpiredError } = jwt;

// Hàm bổ trợ để bắt lỗi Token
const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token đã hết hạn!" });
    }
    return res.status(401).send({ message: "Unauthorized! Token không hợp lệ!" });
};

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "Không tìm thấy Token!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

const isAdmin = (req, res, next) => {
    // Logic: Kiểm tra role từ payload của JWT
    if (req.userRole === "admin") {
        next();
        return;
    }
    res.status(403).send({ message: "Yêu cầu quyền Admin!" });
};

const isGuest = (req, res, next) => {
    // Guest hoặc Admin đều có thể vào các vùng công cộng
    if (req.userRole === "guest" || req.userRole === "admin") {
        next();
        return;
    }
    res.status(403).send({ message: "Yêu cầu quyền người dùng!" });
};

const authJwt = {
    verifyToken,
    isAdmin,
    isGuest
};

module.exports = authJwt;