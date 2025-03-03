import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Job, useJobStore } from '@/store/jobStore';
import PageLayout from '@/components/layout/PageLayout';
import { useAuthStore } from '@/store/authStore';
import { toast } from "sonner";

const JobFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { jobs, addJob, updateJob, fetchJobs } = useJobStore();
  const { user, isAuthenticated } = useAuthStore();
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
    type: 'Full-time' as Job['type'],
    salary: '',
    deadline: null as Date | null,
  });
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect if not authenticated or not a company/admin
    if (!isAuthenticated || (user?.role !== 'company' && user?.role !== 'admin')) {
      toast("Access Denied", {
        description: "You don't have permission to access this page.",
      });
      navigate('/jobs');
      return;
    }

    if (isEditMode && id) {
      // If editing an existing job, load the data
      if (jobs.length === 0) {
        fetchJobs();
      } else {
        const jobToEdit = jobs.find(job => job.id === id);
        
        if (jobToEdit) {
          setFormData({
            title: jobToEdit.title,
            company: jobToEdit.company,
            location: jobToEdit.location,
            description: jobToEdit.description,
            requirements: jobToEdit.requirements.join('\n'),
            type: jobToEdit.type,
            salary: jobToEdit.salary || '',
            deadline: jobToEdit.deadline || null,
          });
        } else {
          toast("Job Not Found", {
            description: "The job you're trying to edit doesn't exist.",
          });
          navigate('/jobs');
        }
      }
    }
  }, [isAuthenticated, user, isEditMode, id, jobs, fetchJobs, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({ ...prev, deadline: date }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const jobData = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        description: formData.description,
        requirements: formData.requirements.split('\n').filter(req => req.trim() !== ''),
        type: formData.type,
        salary: formData.salary || undefined,
        deadline: formData.deadline || undefined,
        postedDate: new Date(),
        createdBy: user?.id || 'unknown',
      };
      
      if (isEditMode && id) {
        await updateJob(id, jobData);
        toast("Job Updated", {
          description: "The job posting has been successfully updated.",
        });
      } else {
        await addJob(jobData);
        toast("Job Created", {
          description: "The new job posting has been successfully created.",
        });
      }
      
      navigate('/jobs');
    } catch (error) {
      toast("Error", {
        description: `Failed to ${isEditMode ? 'update' : 'create'} job posting. Please try again.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {isEditMode ? 'Edit Job Posting' : 'Create New Job Posting'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Software Developer"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Tech Solutions Inc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. San Francisco, CA or Remote"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">Job Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range (Optional)</Label>
                <Input
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. $60,000 - $80,000"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed description of the job..."
                rows={6}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="requirements">
                Requirements (One per line)
              </Label>
              <Textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="e.g. 3+ years of experience with React&#10;Bachelor's degree in Computer Science"
                rows={4}
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter each requirement on a new line.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deadline">Application Deadline (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.deadline ? (
                      format(formData.deadline, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.deadline || undefined}
                    onSelect={handleDateChange}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/jobs')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading 
                  ? (isEditMode ? 'Updating...' : 'Creating...') 
                  : (isEditMode ? 'Update Job' : 'Create Job')
                }
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default JobFormPage;
