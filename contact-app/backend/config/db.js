import mongoose from "mongoose";

class Database {
  static async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB Connected");
    } catch (error) {
      console.error("DB Connection Failed", error);
      process.exit(1);
    }
  }
}

export default Database;
