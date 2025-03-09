import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { useCreateNewEventMutation, useDeleteEventMutation, useFetchEventQuery } from "@/hook/useEvent";

// Define Event Type
export interface Event {
    _id?: string;
    id: number;
    title: string;
    type: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
}

// Event Form Component
interface EventFormProps {
    event: Omit<Event, "id"> | Event;
    setEvent: (event: Omit<Event, "id"> | Event) => void;
    onSubmit: () => void;
    isEditing: boolean;
}

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EventForm = ({ event, setEvent, onSubmit, isEditing }: EventFormProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    return (
        <Card>
            <CardContent className="space-y-4 p-6">
                <h2 className="text-2xl font-bold">{isEditing ? "Edit Event" : "Add Event"}</h2>
                <Input name="title" placeholder="Event Title" value={event.title} onChange={handleChange} />

                {/* Dropdown for Event Type */}
                <label className="block text-sm font-medium">Event Type</label>
                <Select onValueChange={(value) => setEvent({ ...event, type: value })} value={event.type}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Job Fair">Job Fair</SelectItem>
                        <SelectItem value="Internship Drive">Internship Drive</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Alumni Talk">Alumni Talk</SelectItem>
                    </SelectContent>
                </Select>

                <label className="block text-sm font-medium">Start Date</label>
                <Input name="startDate" type="date" value={event.startDate} onChange={handleChange} />

                <label className="block text-sm font-medium">End Date</label>
                <Input name="endDate" type="date" value={event.endDate} onChange={handleChange} />

                <Input name="location" placeholder="Location" value={event.location} onChange={handleChange} />
                <Textarea name="description" placeholder="Event Description" value={event.description} onChange={handleChange} />
                <Button onClick={onSubmit} className="w-full">{isEditing ? "Update Event" : "Add Event"}</Button>
            </CardContent>
        </Card>
    );
};


// Main Event Manager Component
export default function EventManager() {
    const { mutate } = useCreateNewEventMutation();
    const { data } = useFetchEventQuery();
    const [events, setEvents] = useState<Event[]>([]);
    const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
        title: "",
        type: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
    });

    const [editEvent, setEditEvent] = useState<Event | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // ✅ Custom Validation Function
    const validateEvent = (event: Omit<Event, "id"> | Event) => {
        if (!event.title.trim()) {
            toast.error("Event title is required!");
            return false;
        }
        if (!event.type.trim()) {
            toast.error("Event type is required!");
            return false;
        }
        if (!event.startDate) {
            toast.error("Start date is required!");
            return false;
        }
        if (!event.endDate) {
            toast.error("End date is required!");
            return false;
        }
        if (new Date(event.startDate) > new Date(event.endDate)) {
            toast.error("Start date must be before end date!");
            return false;
        }
        if (!event.location.trim()) {
            toast.error("Location is required!");
            return false;
        }
        if (!event.description.trim()) {
            toast.error("Event description is required!");
            return false;
        }
        return true;
    };

    // ✅ Add Event
    const addEvent = () => {
        if (!validateEvent(newEvent)) return;

        mutate(newEvent as Event);
        setIsDialogOpen(false);
        toast.success("Event added successfully!");
    };

    // ✅ Update Event
    const updateEvent = () => {
        if (!editEvent || !validateEvent(editEvent)) return;

        setEvents(events.map((event) => (event.id === editEvent.id ? editEvent : event)));
        setEditEvent(null);
        setIsDialogOpen(false);
        setIsEditing(false);
        toast.success("Event updated successfully!");
    };


    const { mutate: deleteMuatate } = useDeleteEventMutation();
    // ✅ Delete Event
    const deleteEvent = (id: string) => {
        deleteMuatate(id);
        toast.success("Event deleted successfully!");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => {
                        setIsEditing(false);
                        setNewEvent({ title: "", type: "", startDate: "", endDate: "", location: "", description: "" });
                    }}>
                        Add Event
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <EventForm
                        event={isEditing ? (editEvent as Event) : newEvent}
                        setEvent={(event) => isEditing ? setEditEvent(event as Event) : setNewEvent(event as Omit<Event, "id">)}
                        onSubmit={isEditing ? updateEvent : addEvent}
                        isEditing={isEditing}
                    />
                </DialogContent>
            </Dialog>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.length > 0 && data?.data.map((event: Event) => (
                        <TableRow key={event.id}>
                            <TableCell>{event.title}</TableCell>
                            <TableCell>{event.type}</TableCell>
                            <TableCell>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</TableCell>
                            <TableCell>{event.location}</TableCell>
                            <TableCell className="flex space-x-2">
                                <Dialog open={isDialogOpen && isEditing} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => {
                                            setEditEvent(event);
                                            setIsEditing(true);
                                            setIsDialogOpen(true);
                                        }}>
                                            Edit
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <EventForm
                                            event={editEvent as Event}
                                            setEvent={(event) => setEditEvent(event as Event)}
                                            onSubmit={updateEvent}
                                            isEditing={true}
                                        />
                                    </DialogContent>
                                </Dialog>
                                <Button variant="destructive" onClick={() => deleteEvent(event._id!)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Toaster />
        </div>
    );
}
