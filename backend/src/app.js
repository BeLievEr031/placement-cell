import dotenv from "dotenv"
dotenv.config();

import express from "express"
const app = express();

app.use(express.json({ limit: "1MB" }))
app.use(express.urlencoded({ extended: true, limit: "1MB" }))

export default app;
