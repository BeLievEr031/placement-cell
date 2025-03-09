import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    salary: {
        type: Number,
        required: true
    },
    description: { type: String, required: true, trim: true },
    jobType: { type: String, enum: ["Full-time", "Part-time", "Internship"], required: true, trim: true, default: "Full-time" },
    deadline: {
        type: Date,
        required: true
    },
    requirements: { type: String, required: true, trim: true },
}, {
    timestamps: true
});

const JobModel = mongoose.model("JobModel", jobSchema);
export default JobModel;