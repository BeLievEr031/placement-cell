import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { Calendar, MapPin, Briefcase, Clock, ArrowLeft, UploadCloud } from "lucide-react";
import { useFetchJobByIdQuery } from "@/hooks/useJob";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useFetchJobByIdQuery(id);
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", resume: null });
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [applied, setApplied] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await axios.get(`http://localhost:5000/api/v1/placement/applicants/job/${id}`);
        console.log(data.data);
        setApplied(data.data.applied)

      } catch (error) {
        console.log(error);

      }
    }

    fetch();
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast.error("Only PDF files are allowed.");
        return;
      }
      setForm({ ...form, resume: selectedFile });
    }
  };

  const uploadResume = async () => {
    if (!form.resume) {
      toast.error("Please upload a resume.");
      return;
    }
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", form.resume);
      formData.append("upload_preset", "placement-cell-pdf");
      formData.append("resource_type", "auto");

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/dfmuea3kz/raw/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
            setUploadProgress(percentCompleted);
          },
        }
      );

      console.log(data);

      setResumeUrl(data.secure_url);
      toast.success("Resume uploaded successfully!");
    } catch (error) {
      toast.error("Error uploading resume.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, phone, email, address } = form;

    if (!name || !phone || !email || !address || !resumeUrl) {
      toast.error("All fields are required.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      toast.error("Phone number must be 10 digits.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid email format.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/v1/placement/applicants", {
        name, phone, email, address, resumeUrl, jobId: id, clerkId: user!.id
      });

      toast.success("Application submitted successfully!");
      setIsOpen(false);
    } catch (error) {
      toast.error("Error submitting application.");
      console.error(error);
    }
  };



  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/jobs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Link>
          </Button>

          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h1 className="text-2xl font-bold mb-2">{data?.data?.title}</h1>
            <p className="text-muted-foreground mb-4">{data?.data?.company}</p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{data?.data?.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Briefcase className="h-4 w-4 mr-1" />
                <span className="text-sm">{data?.data?.jobType}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <span className="text-sm">${data?.data?.salary}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm">Posted {new Date(data?.data?.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">Deadline: {new Date(data?.data?.deadline).toLocaleDateString()}</span>
              </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button disabled={applied}>{applied ? "Alreday applied" : "Apply Now"}</Button>
              </DialogTrigger>
              <DialogContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Apply for {data?.data?.title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input type="text" name="name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input type="text" name="phone" value={form.phone} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" name="email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input type="text" name="address" value={form.address} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label>Upload Resume (PDF Only)</Label>
                    <Input type="file" onChange={handleFileChange} accept="application/pdf" required />
                    <Button type="button" onClick={uploadResume} className="mt-2">
                      <UploadCloud className="h-4 w-4 mr-2" />
                      {isUploading ? "Uploading..." : "Upload Resume"}
                    </Button>
                    {uploadProgress > 0 && <p className="text-sm mt-1">{uploadProgress}% uploaded</p>}
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isUploading}>Submit Application</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default JobDetailPage;
