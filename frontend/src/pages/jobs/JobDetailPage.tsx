/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { Calendar, MapPin, Briefcase, Clock, ArrowLeft } from 'lucide-react';
import { useFetchJobByIdQuery } from '@/hooks/useJob';

const job = {
  _id: "67cd3efc273c742d501d5623",
  title: "First Voting",
  company: "First Voting",
  location: "First Voting",
  salary: 45,
  description: "First Voting",
  jobType: "Full-time",
  deadline: "2025-03-21T00:00:00.000Z",
  requirements: "First Voting",
  createdAt: "2025-03-09T07:10:52.268Z",
  updatedAt: "2025-03-09T07:10:52.268Z",
};

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const { data } = useFetchJobByIdQuery(id);

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

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-2">Job Description</h2>
              <p className="mb-4">{data?.data?.description}</p>

              <h2 className="text-xl font-semibold mb-2">Requirements</h2>
              <p>{data?.data?.requirements}</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default JobDetailPage;
