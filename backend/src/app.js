import dotenv from "dotenv"
dotenv.config();
import express from "express"
import jobRouter from "./routes/jobRoutes.js";
const app = express();

app.use(express.json({ limit: "1MB" }))
app.use(express.urlencoded({ extended: true, limit: "1MB" }))


app.use("/api/v1/placement/job", jobRouter)
export default app;
