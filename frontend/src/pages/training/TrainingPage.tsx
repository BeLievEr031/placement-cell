
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { GraduationCap, Book, Video, FileText, Search, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

// Sample training resources
const trainingResources = [
  {
    id: '1',
    title: 'Resume Building Workshop',
    type: 'workshop',
    description: 'Learn how to create a compelling resume that highlights your strengths and experiences.',
    duration: '2 hours',
    level: 'Beginner',
    link: '#',
  },
  {
    id: '2',
    title: 'Technical Interview Preparation',
    type: 'course',
    description: 'Comprehensive guide to technical interviews with practice problems and solutions.',
    duration: '4 weeks',
    level: 'Intermediate',
    link: '#',
  },
  {
    id: '3',
    title: 'LinkedIn Profile Optimization',
    type: 'guide',
    description: 'Step-by-step guide to creating a professional LinkedIn profile that attracts recruiters.',
    duration: '1 hour',
    level: 'Beginner',
    link: '#',
  },
  {
    id: '4',
    title: 'Soft Skills Development',
    type: 'course',
    description: 'Enhance your communication, teamwork, and problem-solving skills essential for any workplace.',
    duration: '3 weeks',
    level: 'All Levels',
    link: '#',
  },
  {
    id: '5',
    title: 'Mock Interview Sessions',
    type: 'workshop',
    description: 'Practice interviews with industry professionals who provide personalized feedback.',
    duration: '1 hour',
    level: 'Intermediate',
    link: '#',
  },
  {
    id: '6',
    title: 'Networking Strategies for Job Seekers',
    type: 'guide',
    description: 'Learn effective networking techniques to build professional relationships and discover hidden job opportunities.',
    duration: '45 minutes',
    level: 'Beginner',
    link: '#',
  },
  {
    id: '7',
    title: 'Advanced Data Science Projects',
    type: 'course',
    description: 'Practical projects to build your portfolio and demonstrate your data science skills to potential employers.',
    duration: '8 weeks',
    level: 'Advanced',
    link: '#',
  },
  {
    id: '8',
    title: 'Salary Negotiation Tactics',
    type: 'video',
    description: 'Expert tips on how to negotiate your salary and benefits package with confidence.',
    duration: '30 minutes',
    level: 'All Levels',
    link: '#',
  },
];

type ResourceType = 'all' | 'course' | 'workshop' | 'guide' | 'video';

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'course':
      return <Book className="h-6 w-6" />;
    case 'workshop':
      return <GraduationCap className="h-6 w-6" />;
    case 'guide':
      return <FileText className="h-6 w-6" />;
    case 'video':
      return <Video className="h-6 w-6" />;
    default:
      return <Book className="h-6 w-6" />;
  }
};

const getResourceLabel = (type: string) => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const TrainingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<ResourceType>('all');

  const filteredResources = trainingResources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = activeTab === 'all' || resource.type === activeTab;

    return matchesSearch && matchesType;
  });

  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Training & Development</h1>
          <p className="text-muted-foreground mb-8">
            Access resources to enhance your skills and prepare for your career journey
          </p>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as ResourceType)} className="mb-8">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="course">Courses</TabsTrigger>
              <TabsTrigger value="workshop">Workshops</TabsTrigger>
              <TabsTrigger value="guide">Guides</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Resources List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <Card key={resource.id} className="hover-scale">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className={cn(
                        "p-2 rounded-md",
                        resource.type === 'course' && "bg-blue-50 text-blue-600",
                        resource.type === 'workshop' && "bg-purple-50 text-purple-600",
                        resource.type === 'guide' && "bg-green-50 text-green-600",
                        resource.type === 'video' && "bg-red-50 text-red-600",
                      )}>
                        {getResourceIcon(resource.type)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                          {resource.level}
                        </span>
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                          {resource.duration}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="mt-4">{resource.title}</CardTitle>
                    <CardDescription>
                      {getResourceLabel(resource.type)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{resource.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/training/${resource.id}`}>
                        Access Resource <ExternalLink />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-muted/30 rounded-lg">
                <Book className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No resources found</h3>
                <p className="text-muted-foreground mb-6">
                  No training resources match your current search. Try adjusting your criteria.
                </p>
                <Button onClick={() => {
                  setSearchTerm('');
                  setActiveTab('all');
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TrainingPage;
