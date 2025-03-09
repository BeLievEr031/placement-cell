import express from "express";
import {
    createTraining,
    getTrainings,
    getTrainingById,
    updateTraining,
    deleteTraining
} from "../controller/trainingController.js";

const trainingRouter = express.Router();

trainingRouter.post("/", createTraining);
trainingRouter.get("/", getTrainings);
trainingRouter.get("/:id", getTrainingById);
trainingRouter.put("/:id", updateTraining);
trainingRouter.delete("/:id", deleteTraining);

export default trainingRouter;
