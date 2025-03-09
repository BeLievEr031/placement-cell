import EventModel from "../model/EventModel.js";
import { eventSchema } from "../middleware/validationMiddleware.js";

// ✅ Create a new event
export const createEvent = async (req, res) => {
    try {
        const { error } = eventSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const event = new EventModel(req.body);
        await event.save();
        res.status(201).json({ message: "Event added successfully", event });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Get all events
export const getEvents = async (req, res) => {
    try {
        const events = await EventModel.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Get an event by ID
export const getEventById = async (req, res) => {
    try {
        const event = await EventModel.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Update an event
export const updateEvent = async (req, res) => {
    try {
        const { error } = eventSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const updatedEvent = await EventModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) return res.status(404).json({ message: "Event not found" });

        res.status(200).json({ message: "Event updated successfully", updatedEvent });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Delete an event
export const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await EventModel.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ message: "Event not found" });

        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
