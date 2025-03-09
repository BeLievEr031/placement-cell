import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import jobRouter from "./routes/jobRoutes.js";
const app = express();

app.use(express.json({ limit: "1MB" }))
app.use(express.urlencoded({ extended: true, limit: "1MB" }))
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5175"]
}))

app.use("/api/v1/placement/job", jobRouter)
export default app;
