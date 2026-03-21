class UserService {
  execute() {
    console.log("👤 User Service executed");
  }
}

class OrderService {
  execute() {
    console.log("📦 Order Service executed");
  }
}

class ServiceFactory {
  static createService(type) {
    switch (type) {
      case "user":
        return new UserService();
      case "order":
        return new OrderService();
      default:
        throw new Error("Unknown service type");
    }
  }
}

module.exports = ServiceFactory;
