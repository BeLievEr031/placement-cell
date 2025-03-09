import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"



// Define Event Type
interface Event {
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

const EventForm = ({ event, setEvent, onSubmit, isEditing }: EventFormProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    return (
        <Card>
            <CardContent className="space-y-4 p-6">
                <h2 className="text-2xl font-bold">{isEditing ? "Edit Event" : "Add Event"}</h2>
                <Input name="title" placeholder="Event Title" value={event.title} onChange={handleChange} />

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


    const addEvent = () => {
        if (!newEvent.title || !newEvent.type || !newEvent.startDate || !newEvent.endDate || !newEvent.location || !newEvent.description) {
            toast.error("All fields are required!");
            return;
        }

        if (new Date(newEvent.startDate) > new Date(newEvent.endDate)) {
            toast.success("Start date must be before end date!");
            return;
        }

        setEvents([...events, { ...newEvent, id: events.length + 1 }]);
        setNewEvent({ title: "", type: "", startDate: "", endDate: "", location: "", description: "" });
        setIsDialogOpen(false);
        toast.success("Event added successfully!");
    };

    const updateEvent = () => {
        if (editEvent) {
            if (!editEvent.title || !editEvent.type || !editEvent.startDate || !editEvent.endDate || !editEvent.location || !editEvent.description) {
                toast.error("All fields are required!");
                return;
            }

            if (new Date(editEvent.startDate) > new Date(editEvent.endDate)) {
                toast.error("Start date must be before end date!");
                return;
            }

            setEvents(events.map((event) => (event.id === editEvent.id ? editEvent : event)));
            setEditEvent(null);
            setIsDialogOpen(false);
            setIsEditing(false);
            toast.success("Event updated successfully!")
        }
    };

    const deleteEvent = (id: number) => {
        setEvents(events.filter((event) => event.id !== id));
        toast.success("Event deleted successfully!")
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
                    {events.map((event) => (
                        <TableRow key={event.id}>
                            <TableCell>{event.title}</TableCell>
                            <TableCell>{event.type}</TableCell>
                            <TableCell>{event.startDate} - {event.endDate}</TableCell>
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
                                <Button variant="destructive" onClick={() => deleteEvent(event.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Toaster />
        </div>
    );
}
