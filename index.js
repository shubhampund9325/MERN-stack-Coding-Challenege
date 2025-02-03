import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import transactionRoutes from "./routes/transactions.js"; // ✅ Use import, and add .js extension

config();
const app = express();
app.use(json());
app.use(cors());

// Connect to MongoDB
connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

app.use("/api", transactionRoutes); // ✅ Use imported routes

app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT}`));