import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { Progress } from "@/components/ui/progress"; // ✅ Import Progress Bar
import { useCreateNewLectureMutation, useDeleteLectureMutation, useFetchLectureQuery } from "@/hook/useLecture";

export interface Lecture {
    _id?: string;
    trainingId: string;
    id: number;
    title: string;
    videoUrl: string;
}

export default function AddVideos() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Get training ID from URL

    const { mutate } = useCreateNewLectureMutation();
    const { mutate: deleteMutate } = useDeleteLectureMutation();
    const { data } = useFetchLectureQuery(id!.split("-")[1]);

    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0); // ✅ Progress State
    const [uploading, setUploading] = useState<boolean>(false); // ✅ Uploading State
    const [newLecture, setNewLecture] = useState<{ title: string; videoUrl: string }>({
        title: "",
        videoUrl: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const videoUrl = URL.createObjectURL(selectedFile); // Temporary URL for preview
            setNewLecture({ ...newLecture, videoUrl });
        }
    };

    const addLecture = async () => {
        if (!newLecture.title || !file) {
            toast.error("Both title and video are required!");
            return;
        }

        try {
            setUploading(true); // ✅ Start Upload
            setUploadProgress(0); // ✅ Reset Progress

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "placements-cell");

            const { data } = await axios.post(
                `https://api.cloudinary.com/v1_1/dfmuea3kz/video/upload`,
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                        setUploadProgress(percentCompleted);
                    },
                }
            );

            // ✅ Store uploaded video in state
            const newVideo = {
                trainingId: id?.split("-")[1],
                title: newLecture.title,
                videoUrl: data.secure_url,
            };

            mutate(newVideo as Lecture)

            console.log(newVideo);
            console.log(id?.split("-")[1]);


            // setLectures([...lectures, newVideo]);
            // setNewLecture({ title: "", videoUrl: "" });
            // setFile(null);
            // setIsModalOpen(false);
            // toast.success("Lecture added successfully!");

        } catch (error) {
            toast.error("Upload failed!");
            console.error("Upload Error:", error);
        } finally {
            setUploading(false); // ✅ Stop Upload
            setUploadProgress(0); // ✅ Reset Progress
        }
    };

    const deleteLecture = (id: string) => {
        // setLectures(lectures.filter((lecture) => lecture.id !== lectureId));
        deleteMutate(id)
        toast.success("Lecture deleted successfully!");
    };

    console.log(data?.data);


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

                            {/* Progress Bar (Shows when uploading) */}
                            {uploading && (
                                <Progress value={uploadProgress} className="h-2 mt-2" />
                            )}

                            <Button onClick={addLecture} className="w-full" disabled={uploading}>
                                {uploading ? "Uploading..." : "Add Lecture"}
                            </Button>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>

            {/* Video List */}
            {data?.data.length > 0 && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Preview</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data.length > 0 && data?.data.map((lecture: Lecture) => (
                            <TableRow key={lecture._id}>
                                <TableCell>{lecture.title}</TableCell>
                                <TableCell>
                                    <video controls className="h-16 rounded-lg">
                                        <source src={lecture.videoUrl} type="video/mp4" />
                                    </video>
                                </TableCell>
                                <TableCell>
                                    <Button variant="destructive" onClick={() => deleteLecture(lecture._id!)}>Delete</Button>
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
