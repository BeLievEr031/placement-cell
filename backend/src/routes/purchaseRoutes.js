import express from "express";
import { createPurchase, getUsersAllPurchases, getUserPurchase } from "../controller/purchaseController.js";

const purchaseRouter = express.Router();

purchaseRouter.post("/", createPurchase);
purchaseRouter.get("/single-course", getUserPurchase);

purchaseRouter.get("/:clerkId", getUsersAllPurchases);

export default purchaseRouter;
