import Razorpay from "razorpay";
import Training from "../model/trainingModel.js";
import express from "express";
const paymentRouter = express.Router();

const razorpay = new Razorpay({
    key_id: "rzp_test_cMQQFYPaYpEzfm",
    key_secret: "NoAeuXHpFwz0WqO9y3U1UaWf",
});

paymentRouter.post("/create-order", async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            res.status(HTTP_STATUS.OK).json({ message: "All fields required." })
        }

        const training = await Training.findOne({ _id: id })
        const options = {
            amount: training.price * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);

    } catch (error) {
        res.status(500).json(error);
    }
})

export default paymentRouter;