import express from "express";
import {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
} from "../controller/eventController.js";

const eventRouter = express.Router();

eventRouter.post("/", createEvent); // Add a new event
eventRouter.get("/", getEvents); // Get all events
eventRouter.get("/:id", getEventById); // Get an event by ID
eventRouter.put("/:id", updateEvent); // Update an event
eventRouter.delete("/:id", deleteEvent); // Delete an event

export default eventRouter;
