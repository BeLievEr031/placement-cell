import express from "express";
import { createJob, getAllJobs, getJobById, updateJob, deleteJob, filterJobs } from "../controller/jobController.js";
import { validateJob } from "../middleware/validationMiddleware.js";

const jobRouter = express.Router();

jobRouter.post("/", validateJob, createJob);
jobRouter.get("/", getAllJobs);
jobRouter.get("/filter", filterJobs);
jobRouter.get("/:id", getJobById);
jobRouter.put("/:id", validateJob, updateJob);
jobRouter.delete("/:id", deleteJob);

export default jobRouter;
