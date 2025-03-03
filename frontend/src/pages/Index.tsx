
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, GraduationCap, Calendar, Users } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { useJobStore } from '@/store/jobStore';
import { useEventStore } from '@/store/eventStore';

const Index = () => {
  const { fetchJobs, jobs } = useJobStore();
  const { fetchEvents, events } = useEventStore();

  useEffect(() => {
    fetchJobs();
    fetchEvents();
  }, [fetchJobs, fetchEvents]);

  const features = [
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: 'Job Listings',
      description: 'Discover a wide range of job opportunities tailored to your skills and interests.',
      link: '/jobs',
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      title: 'Training Programs',
      description: 'Enhance your skills with our comprehensive training and development resources.',
      link: '/training',
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: 'Events',
      description: 'Attend recruitment events, workshops, and networking opportunities.',
      link: '/events',
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Communication',
      description: 'Stay connected with employers and receive timely updates on opportunities.',
      link: '/communication',
    },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="hero-section pt-16 lg:pt-24 pb-20 lg:pb-32">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 animate-fade-in">
              Your Bridge to a <span className="text-primary">Successful Career</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
              Connect with top employers, discover opportunities, and kickstart your professional journey through our placement cell services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Button size="lg" asChild>
                <Link to="/jobs">Browse Jobs</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">How We Help You</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our placement cell offers a comprehensive set of resources and services to help you succeed in your career journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-card border border-border rounded-lg p-6 hover-scale"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Button variant="link" className="p-0" asChild>
                  <Link to={feature.link} className="group inline-flex items-center">
                    Explore <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Recent Opportunities</h2>
              <p className="text-muted-foreground">Latest job openings from top companies</p>
            </div>
            <Button asChild className="mt-4 md:mt-0" variant="outline">
              <Link to="/jobs">View All Jobs</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.slice(0, 3).map((job) => (
              <Link 
                key={job.id} 
                to={`/jobs/${job.id}`} 
                className="group"
              >
                <div className="bg-card border border-border rounded-lg p-6 h-full transition-all duration-300 hover:shadow-md hover:border-primary/20">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-medium group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                  <p className="text-sm mb-4">{job.location}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {job.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Posted {new Date(job.postedDate).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Upcoming Events</h2>
              <p className="text-muted-foreground">Connect with employers at these events</p>
            </div>
            <Button asChild className="mt-4 md:mt-0" variant="outline">
              <Link to="/events">All Events</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event) => (
              <Link 
                key={event.id} 
                to={`/events/${event.id}`}
                className="group"
              >
                <div className="bg-card border border-border rounded-lg overflow-hidden h-full hover-scale">
                  <div className="bg-muted h-40 flex items-center justify-center">
                    <Calendar className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {event.type.replace('-', ' ')}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(event.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {event.location}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Ready to Begin Your Career Journey?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Create an account today to access all our placement resources and connect with top employers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Create Account</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 hover:bg-primary-foreground/10" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
