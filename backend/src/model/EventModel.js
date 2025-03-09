import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        location: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
    },
    { timestamps: true }
);

const EventModel = mongoose.model("Event", eventSchema);
export default EventModel;
