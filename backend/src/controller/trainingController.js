import Training from "../model/trainingModel.js";
import { validateTraining } from "../middleware/validationMiddleware.js";

/**
 * @desc    Create a new training program
 * @route   POST /api/trainings
 */
export const createTraining = async (req, res) => {
    try {
        const error = validateTraining(req.body);
        if (error) return res.status(400).json({ success: false, message: error });

        const training = new Training(req.body);
        await training.save();

        res.status(201).json({ success: true, message: "Training created successfully", training });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

/**
 * @desc    Get all training programs
 * @route   GET /api/trainings
 */
export const getTrainings = async (req, res) => {
    try {
        const trainings = await Training.find();
        res.status(200).json({ success: true, trainings });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

/**
 * @desc    Get a single training program by ID
 * @route   GET /api/trainings/:id
 */
export const getTrainingById = async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);
        if (!training) return res.status(404).json({ success: false, message: "Training not found" });

        res.status(200).json({ success: true, training });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

/**
 * @desc    Update a training program by ID
 * @route   PUT /api/trainings/:id
 */
export const updateTraining = async (req, res) => {
    try {
        const error = validateTraining(req.body);
        if (error) return res.status(400).json({ success: false, message: error });

        const training = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!training) return res.status(404).json({ success: false, message: "Training not found" });

        res.status(200).json({ success: true, message: "Training updated successfully", training });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

/**
 * @desc    Delete a training program by ID
 * @route   DELETE /api/trainings/:id
 */
export const deleteTraining = async (req, res) => {
    try {
        const training = await Training.findByIdAndDelete(req.params.id);
        if (!training) return res.status(404).json({ success: false, message: "Training not found" });

        res.status(200).json({ success: true, message: "Training deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};
