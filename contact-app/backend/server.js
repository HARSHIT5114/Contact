import dotenv from "dotenv";
import app from "./app.js";
import Database from "./config/db.js";

dotenv.config();

const startServer = async () => {
  try {
    await Database.connect(); 

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server startup failed:", err.message);
    process.exit(1);
  }
};

startServer();
