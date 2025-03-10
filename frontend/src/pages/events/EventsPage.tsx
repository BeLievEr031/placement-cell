import PageLayout from '@/components/layout/PageLayout';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { useFetchEventQuery } from '@/hooks/useEvent';

// const events = [
//   {
//     _id: "67cd4d7c7aab10ccc1a9ec2e",
//     title: "afdsaf",
//     startDate: "2025-03-19T00:00:00.000Z",
//     endDate: "2025-03-20T00:00:00.000Z",
//     location: "event tirle",
//     type: "Workshop",
//     description: "event tirleevent tirleevent tirle",
//   },
// ];

const EventsPage = () => {
  const { data } = useFetchEventQuery();
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
          {data?.data?.length > 0 && data?.data?.map((event) => (
            // <Link key={event._id} to={`/events/${event._id}`} className="block group mb-6">
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg">
              <h2 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                {event.title}
              </h2>
              <div className="flex items-center text-muted-foreground mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">
                  {format(new Date(event.startDate), 'MMMM d, yyyy')} - {format(new Date(event.endDate), 'MMMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{event.location}</span>
              </div>
              <p className="text-muted-foreground line-clamp-2 mb-4">{event.description}</p>
              <span className="text-white line-clamp-2 mb-4 bg-green-500/80 px-2 py-1 rounded-xl inline-block">{event.type}</span>
              <br />
              {/* <Button variant="outline" size="sm">View Details</Button> */}
            </div>
            // </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default EventsPage;
