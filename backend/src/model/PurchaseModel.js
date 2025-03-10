import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
    {
        clerkId: { type: String, required: true },
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Training", required: true },
        amount: { type: Number, required: true },
    },
    { timestamps: true }
);

const PurchaseModel = mongoose.model("PurchaseModel", purchaseSchema);
export default PurchaseModel;
