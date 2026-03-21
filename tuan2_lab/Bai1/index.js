
const DatabaseConnection_Singleton = require("../Lab2/DatabaseConnection_Singleton");
const ServiceFactory = require("./ServiceFactory");

// Singleton
const db1 = DatabaseConnection_Singleton.getInstance();
const db2 = DatabaseConnection_Singleton.getInstance();

db1.connect();
db2.connect();

console.log("Same instance:", db1 === db2);

// Factory
const userService = ServiceFactory.createService("user");
const orderService = ServiceFactory.createService("order");

userService.execute();
orderService.execute();
