import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import jobRouter from "./routes/jobRoutes.js";
import applicantsRouter from "./routes/applicantsRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import trainingRouter from "./routes/trainingRoutes.js";
const app = express();

app.use(express.json({ limit: "1MB" }))
app.use(express.urlencoded({ extended: true, limit: "1MB" }))
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5175"]
}))

app.use("/api/v1/placement/job", jobRouter)
app.use("/api/v1/placement/applicants", applicantsRouter)
app.use("/api/v1/placement/event", eventRouter)
app.use("/api/v1/placement/training", trainingRouter)

export default app;
