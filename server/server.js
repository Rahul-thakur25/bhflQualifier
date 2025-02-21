import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bfhlRoutes from "./routes/bfhlRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use("/api", bfhlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
