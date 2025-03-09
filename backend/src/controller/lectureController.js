import { lectureSchema } from "../middleware/validationMiddleware.js";
import Lecture from "../model/LectureModel.js";

// ✅ Get all lectures
export const getLectures = async (req, res) => {
    try {

        const { trainingId } = req.query;
        if (!trainingId) return res.status(400).json({ error: "Training id required." });

        const lectures = await Lecture.find({ trainingId });
        res.status(200).json(lectures);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Create a new lecture
export const createLecture = async (req, res) => {
    try {
        const { error } = lectureSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });
        const { trainingId, title, videoUrl } = req.body;
        const newLecture = new Lecture({ trainingId, title, videoUrl });
        await newLecture.save();
        res.status(201).json(newLecture);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Delete a lecture
export const deleteLecture = async (req, res) => {
    try {
        const { id } = req.params;
        await Lecture.findByIdAndDelete(id);
        res.status(200).json({ message: "Lecture deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
