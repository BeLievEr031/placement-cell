import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    trainingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Training"
    },
    title: { type: String, required: true },
    videoUrl: { type: String, required: true }
}, { timestamps: true });

const LectureModel = mongoose.model("LectureModel", lectureSchema);
export default LectureModel;
