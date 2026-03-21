class DatabaseConnection_Singleton {
  static instance;

  constructor() {
    if (DatabaseConnection_Singleton.instance) {
      throw new Error("Use getInstance() instead");
    }
    this.connected = false;
  }

  static getInstance() {
    if (!DatabaseConnection_Singleton.instance) {
      DatabaseConnection_Singleton.instance = new DatabaseConnection_Singleton();
    }
    return DatabaseConnection_Singleton.instance;
  }

  connect() {
    if (!this.connected) {
      this.connected = true;
      console.log("✅ Database connected");
    } else {
      console.log("⚠️ Database already connected");
    }
  }
}

module.exports = DatabaseConnection_Singleton;
