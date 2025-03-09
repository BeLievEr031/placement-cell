import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Lecture {
    id: number;
    title: string;
    videoUrl: string;
}

export default function AddVideos() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Get training ID from URL

    const [lectures, setLectures] = useState<Lecture[]>([]);
    const [newLecture, setNewLecture] = useState<{ title: string; videoUrl: string }>({
        title: "",
        videoUrl: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const videoUrl = URL.createObjectURL(file); // Temporary URL for preview
            setNewLecture({ ...newLecture, videoUrl });
        }
    };

    const addLecture = () => {
        if (!newLecture.title || !newLecture.videoUrl) {
            toast.error("Both title and video are required!");
            return;
        }

        setLectures([...lectures, { ...newLecture, id: lectures.length + 1 }]);
        setNewLecture({ title: "", videoUrl: "" });
        toast.success("Lecture added successfully!");
        setIsModalOpen(false); // Close modal after adding lecture
    };

    const deleteLecture = (lectureId: number) => {
        setLectures(lectures.filter((lecture) => lecture.id !== lectureId));
        toast.success("Lecture deleted successfully!");
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Add Videos for Training #{id}</h1>

            {/* Back Button */}
            <Button onClick={() => navigate(-1)} variant="outline">
                Back to Training List
            </Button>

            {/* Open Modal Button */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild className="ml-5">
                    <Button className="mt-4">Add New Video</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add a New Lecture</DialogTitle>
                    </DialogHeader>
                    <Card>
                        <CardContent className="space-y-4 p-6">
                            <Input
                                name="title"
                                placeholder="Lecture Title"
                                value={newLecture.title}
                                onChange={(e) => setNewLecture({ ...newLecture, title: e.target.value })}
                            />
                            <Input type="file" accept="video/*" onChange={handleFileUpload} />
                            {newLecture.videoUrl && (
                                <video controls className="w-full rounded-lg">
                                    <source src={newLecture.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                            <Button onClick={addLecture} className="w-full">Add Lecture</Button>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>

            {/* Video List */}
            {lectures.length > 0 && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Preview</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lectures.map((lecture) => (
                            <TableRow key={lecture.id}>
                                <TableCell>{lecture.title}</TableCell>
                                <TableCell>
                                    <video controls className="h-16 rounded-lg">
                                        <source src={lecture.videoUrl} type="video/mp4" />
                                    </video>
                                </TableCell>
                                <TableCell>
                                    <Button variant="destructive" onClick={() => deleteLecture(lecture.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <Toaster />
        </div>
    );
}
