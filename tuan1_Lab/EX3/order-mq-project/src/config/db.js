const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function initDB() {
    // Mở hoặc tạo file database tên là database.sqlite
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    // Tạo bảng Orders nếu chưa có
    await db.exec(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId TEXT,
            status TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    return db;
}

module.exports = { initDB };