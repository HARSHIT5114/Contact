import app from "./app.js";
import dotenv from "dotenv";
import Database from "./config/db.js";

dotenv.config();

Database.connect();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
