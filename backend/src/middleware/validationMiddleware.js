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
