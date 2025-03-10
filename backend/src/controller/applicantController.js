import ApplicantModel from "../model/ApplicantModel.js";
import { applicantSchema } from "../middleware/validationMiddleware.js";

// ✅ Create a new applicant
export const createApplicant = async (req, res) => {
    try {
        const { error } = applicantSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const applicant = new ApplicantModel(req.body);
        await applicant.save();
        res.status(201).json({ message: "Applicant added successfully", applicant });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Get all applicants
export const getApplicants = async (req, res) => {
    try {
        const applicants = await ApplicantModel.find();
        res.status(200).json(applicants);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Get an applicant by ID
export const getApplicantById = async (req, res) => {
    try {
        const applicant = await ApplicantModel.findById(req.params.id);
        if (!applicant) return res.status(404).json({ message: "Applicant not found" });
        res.status(200).json(applicant);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Update an applicant
export const updateApplicant = async (req, res) => {
    try {
        const { error } = applicantSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const updatedApplicant = await ApplicantModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedApplicant) return res.status(404).json({ message: "Applicant not found" });

        res.status(200).json({ message: "Applicant updated successfully", updatedApplicant });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Delete an applicant
export const deleteApplicant = async (req, res) => {
    try {
        const deletedApplicant = await ApplicantModel.findByIdAndDelete(req.params.id);
        if (!deletedApplicant) return res.status(404).json({ message: "Applicant not found" });

        res.status(200).json({ message: "Applicant deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Filter applicants by name or email
export const filterApplicants = async (req, res) => {
    try {
        const { name, email } = req.query;
        const query = {};

        if (name) query.name = { $regex: name, $options: "i" }; // Case-insensitive search
        if (email) query.email = { $regex: email, $options: "i" };

        const applicants = await ApplicantModel.find(query);
        res.status(200).json(applicants);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


export const isApplied = async (req, res) => {
    try {
        const { id } = req.params;
        const applicants = await ApplicantModel.find({ jobId: id });
        if (applicants) {
            res.status(200).json({ applied: true });
            return;
        }

        res.status(200).json({ applied: false });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

