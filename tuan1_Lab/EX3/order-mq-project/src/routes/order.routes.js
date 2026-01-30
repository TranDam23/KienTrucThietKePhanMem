const controller = require("../controllers/order.controller");

module.exports = (app) => {
    app.post("/api/order/no-mq", controller.createOrderNoMQ);
    app.post("/api/order/with-mq", controller.createOrderWithMQ);
};