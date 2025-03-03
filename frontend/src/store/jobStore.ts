
import { create } from 'zustand';

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  salary?: string;
  postedDate: Date;
  deadline?: Date;
  createdBy: string;
};

type JobState = {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  addJob: (job: Omit<Job, 'id'>) => Promise<void>;
  updateJob: (id: string, job: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
};

// This is a mock implementation - in a real app, you'd connect to an API
export const useJobStore = create<JobState>((set, get) => ({
  jobs: [],
  loading: false,
  error: null,

  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      // Mock fetch delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockJobs: Job[] = [
        {
          id: '1',
          title: 'Software Developer',
          company: 'Tech Innovations Inc.',
          location: 'San Francisco, CA',
          description: 'Looking for a skilled software developer to join our team.',
          requirements: ['3+ years of experience', 'React.js', 'Node.js'],
          type: 'Full-time',
          salary: '$80,000 - $120,000',
          postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          createdBy: 'admin',
        },
        {
          id: '2',
          title: 'UI/UX Designer',
          company: 'Creative Solutions',
          location: 'New York, NY',
          description: 'Join our design team to create beautiful user interfaces.',
          requirements: ['Portfolio', 'Figma', 'UI/UX principles'],
          type: 'Full-time',
          salary: '$70,000 - $100,000',
          postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
          createdBy: 'admin',
        },
        {
          id: '3',
          title: 'Data Science Intern',
          company: 'Data Insights Co.',
          location: 'Remote',
          description: 'Learn and grow as a data scientist in our internship program.',
          requirements: ['Python', 'Statistics', 'Machine Learning basics'],
          type: 'Internship',
          postedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          createdBy: 'admin',
        },
      ];
      
      set({ jobs: mockJobs, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch jobs', loading: false });
    }
  },

  addJob: async (job) => {
    set({ loading: true, error: null });
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newJob: Job = {
        ...job,
        id: Date.now().toString(),
        postedDate: new Date(),
      };
      
      set({ jobs: [...get().jobs, newJob], loading: false });
    } catch (error) {
      set({ error: 'Failed to add job', loading: false });
    }
  },

  updateJob: async (id, updatedJob) => {
    set({ loading: true, error: null });
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedJobs = get().jobs.map(job => 
        job.id === id ? { ...job, ...updatedJob } : job
      );
      
      set({ jobs: updatedJobs, loading: false });
    } catch (error) {
      set({ error: 'Failed to update job', loading: false });
    }
  },

  deleteJob: async (id) => {
    set({ loading: true, error: null });
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ 
        jobs: get().jobs.filter(job => job.id !== id),
        loading: false 
      });
    } catch (error) {
      set({ error: 'Failed to delete job', loading: false });
    }
  },
}));
