import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import urlRoutes from "./routes/urlRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", urlRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
