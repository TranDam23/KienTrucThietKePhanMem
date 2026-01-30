const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Giả lập Database người dùng
const users = [
    { id: 1, username: "admin", password: bcrypt.hashSync("123456", 8), role: "admin" },
    { id: 2, username: "guest", password: bcrypt.hashSync("123456", 8), role: "guest" }
];

// Mảng lưu trữ Refresh Tokens (Trong thực tế nên lưu vào Database)
let refreshTokens = [];

exports.login = (req, res) => {
    const user = users.find(u => u.username === req.body.username);
    if (!user) return res.status(404).send({ message: "User không tồn tại." });

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ message: "Sai mật khẩu!" });

    // Tạo Access Token (Mục 2 trong ảnh: accessToken)
    const token = jwt.sign({ id: user.id, role: user.role }, config.secret, {
        expiresIn: config.jwtExpiration // ví dụ: 1h
    });

    // Tạo Refresh Token (Mục 2 trong ảnh: refresh Token)
    const refreshToken = jwt.sign({ id: user.id }, config.refreshSecret, {
        expiresIn: config.jwtRefreshExpiration // ví dụ: 24h
    });

    refreshTokens.push(refreshToken);

    res.status(200).send({
        id: user.id,
        username: user.username,
        role: user.role,
        accessToken: token,
        refreshToken: refreshToken
    });
};

exports.refreshToken = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(403).send({ message: "Yêu cầu Refresh Token!" });
    }

    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).send({ message: "Refresh Token không có trong hệ thống!" });
    }

    jwt.verify(refreshToken, config.refreshSecret, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: "Refresh Token đã hết hạn hoặc không hợp lệ!" });
        }

        const user = users.find(u => u.id === decoded.id);
        const newAccessToken = jwt.sign({ id: user.id, role: user.role }, config.secret, {
            expiresIn: config.jwtExpiration
        });

        res.status(200).json({
            accessToken: newAccessToken,
        });
    });
};