
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Job, useJobStore } from '@/store/jobStore';
import PageLayout from '@/components/layout/PageLayout';
import { useAuthStore } from '@/store/authStore';
import { Search, Plus, Briefcase } from 'lucide-react';

const JobsPage = () => {
  const { jobs, loading, fetchJobs } = useJobStore();
  const { isAuthenticated, user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState<string>('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    let result = [...jobs];

    if (searchTerm) {
      result = result.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (jobType) {
      result = result.filter(job => job.type === jobType);
    }

    setFilteredJobs(result);
  }, [jobs, searchTerm, jobType]);

  const canCreateJob = isAuthenticated && (user?.role === 'company' || user?.role === 'admin');

  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Job Opportunities</h1>
            <p className="text-muted-foreground">
              Discover and apply for the latest opportunities
            </p>
          </div>
          {canCreateJob && (
            <Button asChild className="mt-4 md:mt-0">
              <Link to="/jobs/create">
                <Plus className="mr-2 h-4 w-4" /> Post New Job
              </Link>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Filters</h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Search</label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search jobs..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Job Type</label>
                    <Select value={jobType} onValueChange={setJobType}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Types">All Types</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-4" />

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSearchTerm('');
                      setJobType('');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-pulse-slow inline-block">
                    <Briefcase className="w-10 h-10 text-muted-foreground mb-2 mx-auto" />
                  </div>
                  <p className="text-muted-foreground">Loading jobs...</p>
                </div>
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredJobs.map((job) => (
                  <Link key={job.id} to={`/jobs/${job.id}`} className="group">
                    <div className="bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-md hover:border-primary/20">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-medium mb-1 group-hover:text-primary transition-colors">{job.title}</h2>
                          <p className="text-base mb-2">{job.company}</p>
                          <p className="text-sm text-muted-foreground mb-3">{job.location}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                              {job.type}
                            </span>
                            {job.salary && (
                              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                                {job.salary}
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{job.description}</p>

                          <p className="text-xs text-muted-foreground">
                            Posted {new Date(job.postedDate).toLocaleDateString()}
                            {job.deadline && (
                              <> · Deadline: {new Date(job.deadline).toLocaleDateString()}</>
                            )}
                          </p>
                        </div>

                        <Button variant="outline" size="sm" className="self-start mt-2 md:mt-0">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-muted/30 rounded-lg py-16 px-4 text-center">
                <Briefcase className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || jobType
                    ? "No jobs match your current filters. Try adjusting your search criteria."
                    : "There are no job listings available at the moment. Please check back later."}
                </p>
                {(searchTerm || jobType) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setJobType('');
                    }}
                  >
                    Reset Filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default JobsPage;
