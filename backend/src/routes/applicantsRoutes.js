import express from "express";
import {
    createApplicant,
    getApplicants,
    getApplicantById,
    updateApplicant,
    deleteApplicant,
    filterApplicants,
} from "../controller/applicantController.js";

const applicantsRouter = express.Router();

applicantsRouter.post("/", createApplicant); // Add a new applicant
applicantsRouter.get("/", getApplicants); // Get all applicants
applicantsRouter.get("/filter", filterApplicants); // Filter applicants by name or email
applicantsRouter.get("/:id", getApplicantById); // Get an applicant by ID
applicantsRouter.put("/:id", updateApplicant); // Update an applicant
applicantsRouter.delete("/:id", deleteApplicant); // Delete an applicant

export default applicantsRouter;
