const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware để đọc JSON body (Nếu thiếu cái này sẽ bị lỗi undefined body)
app.use(express.json());

// KHÔNG ĐƯỢC THIẾU DÒNG NÀY: Kết nối các API vào app
require("../src/routes/auth.routes")(app);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to JWT Lab" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});