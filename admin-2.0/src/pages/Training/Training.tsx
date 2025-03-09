import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

// Define Training Program Type
interface TrainingProgram {
    id: number;
    title: string;
    level: string;
    duration: string;
    price: string;
    description: string;
    lectures: Lecture[];
}

// Define Lecture Type
interface Lecture {
    id: number;
    title: string;
    videoUrl: string;
}

// Training Form Component
interface TrainingFormProps {
    program: Omit<TrainingProgram, "id"> | TrainingProgram;
    setProgram: (program: Omit<TrainingProgram, "id"> | TrainingProgram) => void;
    onSubmit: () => void;
    isEditing: boolean;
}

const TrainingForm = ({ program, setProgram, onSubmit, isEditing }: TrainingFormProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProgram({ ...program, [e.target.name]: e.target.value });
    };

    return (
        <Card>
            <CardContent className="space-y-4 p-6">
                <h2 className="text-2xl font-bold">{isEditing ? "Edit Training Program" : "Add Training Program"}</h2>
                <Input name="title" placeholder="Training Title" value={program.title} onChange={handleChange} />
                <Select onValueChange={(value) => setProgram({ ...program, level: value })} value={program.level}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                </Select>
                <Input name="duration" placeholder="Duration (e.g., 2 hours)" value={program.duration} onChange={handleChange} />
                <Input name="price" placeholder="Price (e.g., $99.99)" value={program.price} onChange={handleChange} />
                <Textarea name="description" placeholder="Training Description" value={program.description} onChange={handleChange} />
                <Button onClick={onSubmit} className="w-full">{isEditing ? "Update Training" : "Add Training"}</Button>
            </CardContent>
        </Card>
    );
};

// Main Training Page Component
export default function Training() {
    const navigate = useNavigate();
    const [trainings, setTrainings] = useState<TrainingProgram[]>([]);
    const [newTraining, setNewTraining] = useState<Omit<TrainingProgram, "id">>({
        title: "",
        level: "",
        duration: "",
        price: "",
        description: "",
        lectures: [],
    });

    const [editTraining, setEditTraining] = useState<TrainingProgram | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const addTraining = () => {
        if (!newTraining.title || !newTraining.level || !newTraining.duration || !newTraining.price || !newTraining.description) {
            toast.error("All fields are required!");
            return;
        }

        setTrainings([...trainings, { ...newTraining, id: trainings.length + 1 }]);
        setNewTraining({ title: "", level: "", duration: "", price: "", description: "", lectures: [] });
        setIsDialogOpen(false);
        toast.success("Training added successfully!");
    };

    const updateTraining = () => {
        if (editTraining) {
            setTrainings(trainings.map((t) => (t.id === editTraining.id ? editTraining : t)));
            setEditTraining(null);
            setIsDialogOpen(false);
            setIsEditing(false);
            toast.success("Training updated successfully!");
        }
    };

    const deleteTraining = (id: number) => {
        setTrainings(trainings.filter((t) => t.id !== id));
        toast.success("Training deleted successfully");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => { setIsEditing(false); setNewTraining({ title: "", level: "", duration: "", price: "", description: "", lectures: [] }); }}>
                        Add Training
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <TrainingForm
                        program={isEditing ? (editTraining as TrainingProgram) : newTraining}
                        setProgram={(program) => isEditing ? setEditTraining(program as TrainingProgram) : setNewTraining(program as Omit<TrainingProgram, "id">)}
                        onSubmit={isEditing ? updateTraining : addTraining}
                        isEditing={isEditing}
                    />
                </DialogContent>
            </Dialog>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trainings.map((program) => (
                        <TableRow key={program.id}>
                            <TableCell>{program.title}</TableCell>
                            <TableCell>{program.level}</TableCell>
                            <TableCell>{program.duration}</TableCell>
                            <TableCell>{program.price}</TableCell>
                            <TableCell className="flex space-x-2">
                                <Dialog open={isDialogOpen && isEditing} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => { setEditTraining(program); setIsEditing(true); setIsDialogOpen(true); }}>
                                            Edit
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <TrainingForm
                                            program={editTraining as TrainingProgram}
                                            setProgram={setEditTraining}
                                            onSubmit={updateTraining}
                                            isEditing={true}
                                        />
                                    </DialogContent>
                                </Dialog>
                                <Button variant="destructive" onClick={() => deleteTraining(program.id)}>Delete</Button>
                                <Button onClick={() => navigate(`/add-videos/${program.id}`)}>Manage Videos</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Toaster />
        </div>
    );
}
