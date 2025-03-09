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