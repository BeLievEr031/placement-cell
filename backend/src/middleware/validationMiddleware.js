import Joi from "joi";

// Job Validation Schema
const jobSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    company: Joi.string().min(3).max(100).required(),
    location: Joi.string().min(3).max(100).required(),
    salary: Joi.number().positive().required(),
    description: Joi.string().min(10).required(),
    jobType: Joi.string().valid("Full-time", "Part-time", "Internship").required(),
    deadline: Joi.date().required(),
    requirements: Joi.string().min(5).required(),
});

// Middleware to Validate Job Data
export const validateJob = (req, res, next) => {
    const { error } = jobSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export const applicantSchema = Joi.object({
    clerkId: Joi.string().required(),
    name: Joi.string().min(3).max(100).required(),
    jobId: Joi.string().required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        "string.pattern.base": "Phone number must be 10 digits.",
    }),
    email: Joi.string().email().required(),
    address: Joi.string().min(5).required(),
    resumeUrl: Joi.string().uri().required().messages({
        "string.uri": "Resume URL must be a valid link.",
    }),
});

export const validateApplicants = (req, res, next) => {
    const { error } = jobSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export const eventSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    type: Joi.string().min(3).max(100).required(),
    startDate: Joi.date().iso().required().messages({
        "date.format": "Start date must be in ISO format (YYYY-MM-DD).",
    }),
    endDate: Joi.date().iso().required().greater(Joi.ref("startDate")).messages({
        "date.greater": "End date must be after the start date.",
    }),
    location: Joi.string().min(3).max(200).required(),
    description: Joi.string().allow("").optional(),
});

const trainingSchema = Joi.object({
    title: Joi.string().trim().min(1).required().messages({
        "string.empty": "Title is required",
        "any.required": "Title is required",
    }),
    level: Joi.string().valid("Beginner", "Intermediate", "Advanced", "Expert").required().messages({
        "any.only": "Invalid level selected. Choose from Beginner, Intermediate, Advanced, or Expert.",
        "any.required": "Level is required",
    }),
    duration: Joi.string().trim().min(1).required().messages({
        "string.empty": "Duration is required",
        "any.required": "Duration is required",
    }),
    price: Joi.number().min(0).required().messages({
        "number.base": "Valid price is required",
        "number.min": "Price cannot be negative",
        "any.required": "Price is required",
    }),
    description: Joi.string().trim().min(10).required().messages({
        "string.empty": "Description is required",
        "string.min": "Description must be at least 10 characters long",
        "any.required": "Description is required",
    }),
});

export const validateTraining = (data) => {
    const { error } = trainingSchema.validate(data, { abortEarly: false });

    if (error) {
        return error.details.map((err) => err.message).join(", ");
    }

    return null;
};

export const lectureSchema = Joi.object({
    trainingId: Joi.string().required(),
    title: Joi.string().min(3).max(100).required(),
    videoUrl: Joi.string().uri().required()
});