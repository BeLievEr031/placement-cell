import express from "express";
import { createPurchase, getUsersAllPurchases, getUserPurchase } from "../controller/purchaseController.js";

const router = express.Router();

router.post("/", createPurchase);
router.get("/:clerkId", getUsersAllPurchases);
router.get("/single-course", getUserPurchase);

export default router;
