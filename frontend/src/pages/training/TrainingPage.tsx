import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Book, ExternalLink } from 'lucide-react';
import { useFetchTrainingQuery } from '@/hooks/useTraining';

// const trainingResources = [
//   {
//     _id: "67cd7719107fc2152eb426b6",
//     title: "trainingstrainings",
//     level: "Advanced",
//     duration: "65 minutes",
//     price: 45,
//     description: "trainingstrainingstrainings",
//   },
// ];

const TrainingPage = () => {
  const { data } = useFetchTrainingQuery();
  // console.log(data.data.trainings);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Training & Development</h1>
          <p className="text-muted-foreground mb-8">
            Access resources to enhance your skills and prepare for your career journey
          </p>

          {/* Resources List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.data?.trainings.length > 0 && data?.data?.trainings.map((resource) => (
              <Card key={resource._id} className="hover-scale">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                      <Book className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                        {resource.level}
                      </span>
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                        {resource.duration + " Hours"}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="mt-4">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{resource.description}</p>
                </CardContent>
                <CardContent>
                  <p className="text-muted-foreground">Amount: {resource.price}$</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/training/${resource._id}`} state={{ resource }}>
                      Access Resource <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TrainingPage;
