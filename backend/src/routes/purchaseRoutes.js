import express from "express";
import { createPurchase, getUsersAllPurchases, getUserPurchase } from "../controller/purchaseController.js";

const purchaseRouter = express.Router();

purchaseRouter.post("/", createPurchase);
purchaseRouter.get("/:clerkId", getUsersAllPurchases);
purchaseRouter.get("/single-course", getUserPurchase);

export default purchaseRouter;
