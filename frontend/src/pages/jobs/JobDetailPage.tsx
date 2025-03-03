
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Job, useJobStore } from '@/store/jobStore';
import { useAuthStore } from '@/store/authStore';
import PageLayout from '@/components/layout/PageLayout';
import { 
  Calendar, 
  MapPin, 
  Briefcase, 
  Clock, 
  Edit2, 
  Trash2, 
  AlertTriangle,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { jobs, loading, error, fetchJobs, deleteJob } = useJobStore();
  const { isAuthenticated, user } = useAuthStore();
  const [job, setJob] = useState<Job | null>(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (jobs.length === 0) {
      fetchJobs();
    } else {
      const foundJob = jobs.find(j => j.id === id);
      setJob(foundJob || null);
    }
  }, [id, jobs, fetchJobs]);

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse-slow text-center">
            <Briefcase className="w-12 h-12 text-muted-foreground mb-4 mx-auto" />
            <p className="text-muted-foreground">Loading job details...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !job) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Job Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The job listing you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/jobs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Jobs
              </Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const canEdit = isAuthenticated && (user?.role === 'admin' || (user?.role === 'company' && job.createdBy === user.id));

  const handleApply = () => {
    // In a real app, this would send an application to the backend
    setApplied(true);
    toast("Application submitted successfully", {
      description: "Your application has been received. We'll be in touch soon.",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    });
  };

  const handleDelete = async () => {
    try {
      await deleteJob(job.id);
      toast("Job deleted successfully", {
        description: "The job posting has been removed from the system.",
      });
      navigate('/jobs');
    } catch (error) {
      toast("Failed to delete job", {
        description: "There was an error deleting this job. Please try again.",
        icon: <AlertTriangle className="h-4 w-4 text-destructive" />,
      });
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link to="/jobs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Jobs
              </Link>
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <p className="text-xl mb-2">{job.company}</p>
              </div>
              
              {canEdit && (
                <div className="flex items-center gap-2 self-start">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/jobs/edit/${job.id}`}>
                      <Edit2 className="mr-1 h-4 w-4" /> Edit
                    </Link>
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="mr-1 h-4 w-4" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete this job posting. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mt-4 mb-6">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Briefcase className="h-4 w-4 mr-1" />
                <span className="text-sm">{job.type}</span>
              </div>
              {job.salary && (
                <div className="flex items-center text-muted-foreground">
                  <span className="text-sm">{job.salary}</span>
                </div>
              )}
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm">Posted {new Date(job.postedDate).toLocaleDateString()}</span>
              </div>
              {job.deadline && (
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <p className="mb-6 whitespace-pre-line">{job.description}</p>
              
              <h2 className="text-xl font-semibold mb-4">Requirements</h2>
              <ul className="list-disc pl-5 mb-6 space-y-1">
                {job.requirements.map((req, index) => (
                  <li key={index} className="text-base">{req}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {isAuthenticated ? (
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Interested in this opportunity?</h2>
              <p className="text-muted-foreground mb-6">
                Apply now to express your interest in this position. The employer will receive your profile information.
              </p>
              <Button 
                size="lg" 
                onClick={handleApply} 
                disabled={applied}
              >
                {applied ? 'Application Submitted' : 'Apply Now'}
              </Button>
            </div>
          ) : (
            <div className="bg-muted/40 border border-border rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Interested in this opportunity?</h2>
              <p className="text-muted-foreground mb-6">
                Sign in or create an account to apply for this position.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/register">Create Account</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default JobDetailPage;
