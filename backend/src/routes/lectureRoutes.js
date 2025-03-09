import express from "express";
import { getLectures, createLecture, deleteLecture } from "../controller/lectureController.js";

const lectureRouter = express.Router();

// ✅ Routes
lectureRouter.get("/", getLectures);
lectureRouter.post("/", createLecture);
lectureRouter.delete("/:id", deleteLecture);

export default lectureRouter;
