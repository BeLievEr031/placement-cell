import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import jobRouter from "./routes/jobRoutes.js";
import applicantsRouter from "./routes/applicantsRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import trainingRouter from "./routes/trainingRoutes.js";
import lectureRouter from "./routes/lectureRoutes.js";
import purchaseRouter from "./routes/purchaseRoutes.js";
import paymentRouter from "./controller/paymentController.js";
const app = express();

app.use(express.json({ limit: "1MB" }))
app.use(express.urlencoded({ extended: true, limit: "1MB" }))
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174"]
}))

app.use("/api/v1/placement/job", jobRouter)
app.use("/api/v1/placement/applicants", applicantsRouter)
app.use("/api/v1/placement/event", eventRouter)
app.use("/api/v1/placement/training", trainingRouter)
app.use("/api/v1/placement/lecture", lectureRouter)
app.use("/api/v1/placement/purchase", purchaseRouter)
app.use("/api/v1/placement/payment", paymentRouter)

export default app;
