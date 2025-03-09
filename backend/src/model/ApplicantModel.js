import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
    {
        clerkId: { type: String, required: true, unique: true, trim: true },
        name: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
        phone: { type: String, required: true, trim: true, match: /^[0-9]{10}$/ }, // 10-digit phone number
        email: { type: String, required: true, unique: true, trim: true, lowercase: true, match: /^\S+@\S+\.\S+$/ },
        address: { type: String, required: true, trim: true },
        resumeUrl: { type: String, required: true, trim: true, match: /^https?:\/\/.+/ }, // Ensures valid URL
        percentage: { type: Number, required: true }
    },
    {
        timestamps: true, // Adds createdAt & updatedAt fields
    }
);

const ApplicantModel = mongoose.model("ApplicantModel", applicantSchema);
export default ApplicantModel;
