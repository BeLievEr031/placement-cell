import JobModel from "../model/JobModel.js";

// Create Job
export const createJob = async (req, res) => {
    try {
        const job = new JobModel(req.body);
        await job.save();
        res.status(201).json({ message: "Job added successfully", job });
    } catch (error) {
        res.status(500).json({ error: "Error adding job" });
    }
};

// Get All Jobs
export const getAllJobs = async (req, res) => {
    try {
        const { title } = req.query;

        const jobs = await JobModel.find({
            title: { $regex: title ? title : "", $options: "i" },
        });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: "Error fetching jobs" });
    }
};

// Get Job by ID
export const getJobById = async (req, res) => {
    try {
        const job = await JobModel.findById(req.params.id);
        if (!job) return res.status(404).json({ error: "Job not found" });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: "Error fetching job details" });
    }
};

// Update Job
export const updateJob = async (req, res) => {
    try {
        const updatedJob = await JobModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJob) return res.status(404).json({ error: "Job not found" });
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ error: "Error updating job" });
    }
};

// Delete Job
export const deleteJob = async (req, res) => {
    try {
        const deletedJob = await JobModel.findByIdAndDelete(req.params.id);
        if (!deletedJob) return res.status(404).json({ error: "Job not found" });
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting job" });
    }
};

// Filter Jobs by Title & Job Type
export const filterJobs = async (req, res) => {
    try {
        const { title, jobType } = req.query;

        let filter = {};
        if (title) filter.title = new RegExp(title, "i"); // Case insensitive search
        if (jobType) filter.jobType = jobType;

        const jobs = await JobModel.find(filter);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: "Error filtering jobs" });
    }
};
