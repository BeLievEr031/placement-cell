import Purchase from "../model/PurchaseModel.js";
import { purchaseValidator } from "../middleware/validationMiddleware.js";

export const createPurchase = async (req, res) => {
    try {
        // Validate request body
        const { error } = purchaseValidator.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        // Create purchase entry
        const purchase = new Purchase(req.body);
        await purchase.save();

        res.status(201).json({ message: "Purchase successful", data: purchase });
    } catch (error) {
        res.status(500).json({ error: "Server Error", details: error.message });
    }
};

export const getUsersAllPurchases = async (req, res) => {
    try {
        const { clerkId } = req.params;
        const purchases = await Purchase.find({ clerkId }).populate("courseId");

        res.status(200).json({ data: purchases });
    } catch (error) {
        res.status(500).json({ error: "Server Error", details: error.message });
    }
};

export const getUserPurchase = async (req, res) => {
    try {
        const { clerkId, courseId } = req.query;
        console.log(clerkId, courseId);

        const purchases = await Purchase.find({ clerkId, courseId }).populate("courseId");

        res.status(200).json({ data: purchases });
    } catch (error) {
        res.status(500).json({ error: "Server Error", details: error.message });
    }
};
