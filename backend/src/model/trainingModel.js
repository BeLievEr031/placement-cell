import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    level: { type: String, required: true, enum: ["Beginner", "Intermediate", "Advanced"] },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

const Training = mongoose.model("Training", trainingSchema);
export default Training;
