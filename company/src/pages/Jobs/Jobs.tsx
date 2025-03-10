import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useCreateNewJobMutation, useDeleteJobMutation, useFetchJobQuery } from "@/hook/useJob";
import { toast, Toaster } from "sonner";

// Define Job Type
export interface Job {
    _id?: string;
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    description: string;
    jobType: "Full-time" | "Part-time" | "Internship";
    deadline: string;
    requirements: string;
}

// Job Form Component
interface JobFormProps {
    job: Omit<Job, "id"> | Job;
    setJob: (job: Omit<Job, "id"> | Job) => void;
    onSubmit: () => void;
    isEditing: boolean;
}

const JobForm = ({ job, setJob, onSubmit, isEditing }: JobFormProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    return (
        <Card>
            <CardContent className="space-y-4 p-6">
                <h2 className="text-2xl font-bold">{isEditing ? "Edit Job" : "Add Job"}</h2>
                <Input name="title" placeholder="Job Title" value={job.title} onChange={handleChange} />
                <Input name="company" placeholder="Company Name" value={job.company} onChange={handleChange} />
                <Input name="location" placeholder="Location" value={job.location} onChange={handleChange} />
                <Input name="salary" placeholder="Salary" value={job.salary} onChange={handleChange} />
                <Textarea name="description" placeholder="Job Description" value={job.description} onChange={handleChange} />

                {/* Job Type Dropdown */}
                <Select value={job.jobType} onValueChange={(value) => setJob({ ...job, jobType: value as Job["jobType"] })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                </Select>

                {/* Deadline Date Input */}
                <Input type="date" name="deadline" value={job.deadline} onChange={handleChange} />

                {/* Requirements Editor */}
                <Textarea name="requirements" placeholder="Job Requirements" value={job.requirements} onChange={handleChange} />

                <Button onClick={onSubmit} className="w-full">{isEditing ? "Update Job" : "Add Job"}</Button>
            </CardContent>
        </Card>
    );
};

// Main Job Manager Component
export default function JobManager() {
    const { mutate } = useCreateNewJobMutation();
    const { data } = useFetchJobQuery();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [newJob, setNewJob] = useState<Omit<Job, "id">>({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        jobType: "Full-time",
        deadline: "",
        requirements: "",
    });

    const [editJob, setEditJob] = useState<Job | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const validateJobForm = (job: Omit<Job, "id"> | Job) => {
        let isValid = true;

        if (!job.title.trim() || job.title.length < 3 || job.title.length > 100) {
            toast.error("Job title must be between 3-100 characters.");
            isValid = false;
            return;
        }

        if (!job.company.trim() || job.company.length < 3 || job.company.length > 100) {
            toast.error("Company name must be between 3-100 characters.");
            isValid = false;
            return;
        }

        if (!job.location.trim() || job.location.length < 3 || job.location.length > 100) {
            toast.error("Location must be between 3-100 characters.");
            isValid = false;
            return;
        }

        if (!job.salary.trim() || isNaN(Number(job.salary)) || Number(job.salary) <= 0) {
            toast.error("Salary must be a positive number.");
            isValid = false;
            return;
        }

        if (!job.description.trim() || job.description.length < 10) {
            toast.error("Description must be at least 10 characters long.");
            isValid = false;
            return;
        }

        if (!job.jobType) {
            toast.error("Job type is required.");
            isValid = false;
            return;
        }

        if (!job.deadline.trim()) {
            toast.error("Deadline is required.");
            isValid = false;
            return;
        }

        if (!job.requirements.trim() || job.requirements.length < 5) {
            toast.error("Requirements must be at least 5 characters long.");
            isValid = false;
            return;
        }

        return isValid;
    };

    // Add new job
    const addJob = () => {
        if (!validateJobForm(newJob)) return; // Stop if validation fails
        mutate(newJob as Job);
        toast.success("Job added successfully!");
        setIsDialogOpen(false);
    };

    // Update existing job
    const updateJob = () => {
        if (editJob) {
            setJobs(jobs.map((job) => (job.id === editJob.id ? editJob : job)));
            setEditJob(null);
            setIsDialogOpen(false);
            setIsEditing(false);
        }
    };

    const { mutate: deleteMutate } = useDeleteJobMutation()

    // Delete job
    const deleteJob = (id: string) => {
        // setJobs(jobs.filter((job) => job.id !== id));
        deleteMutate(id)
    };

    console.log(data?.data);


    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Open Add Job Modal */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => {
                        setIsEditing(false); setNewJob({
                            title: "", company: "", location: "", salary: "", description: "", jobType: "Full-time", deadline: "", requirements: ""
                        });
                    }}>
                        Add Job
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <JobForm
                        job={isEditing ? (editJob as Job) : newJob}
                        setJob={(job) => isEditing ? setEditJob(job as Job) : setNewJob(job as Omit<Job, "id">)}
                        onSubmit={isEditing ? updateJob : addJob}
                        isEditing={isEditing}
                    />
                </DialogContent>
            </Dialog>

            {/* Job List */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Job Type</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.length > 0 && data?.data.map((job: Job) => (
                        <TableRow key={job.id}>
                            <TableCell>{job.title}</TableCell>
                            <TableCell>{job.company}</TableCell>
                            <TableCell>{job.location}</TableCell>
                            <TableCell>{job.salary}</TableCell>
                            <TableCell>{job.jobType}</TableCell>
                            <TableCell>{new Date(job.deadline).toLocaleDateString()}</TableCell>
                            <TableCell className="flex space-x-2">
                                {/* Edit Job Modal */}
                                <Dialog open={isDialogOpen && isEditing} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => { setEditJob(job); setIsEditing(true); setIsDialogOpen(true); }}>
                                            Edit
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <JobForm
                                            job={isEditing ? (editJob as Job) : newJob}
                                            setJob={(job) => isEditing ? setEditJob(job as Job) : setNewJob(job as Omit<Job, "id">)}
                                            onSubmit={isEditing ? updateJob : addJob}
                                            isEditing={isEditing}
                                        />
                                    </DialogContent>
                                </Dialog>
                                <Button variant="destructive" onClick={() => deleteJob(job._id!)}>Delete</Button>
                                <Button variant="outline" onClick={() => navigate(`/applicants/${job._id}`)}>View Applicants</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Toaster invert={true} />
        </div>
    );
}
