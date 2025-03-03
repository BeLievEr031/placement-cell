
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { Calendar, MapPin, Search, Calendar as CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { JobEvent, useEventStore } from '@/store/eventStore';
import { format } from 'date-fns';

const EventsPage = () => {
  const { events, loading, fetchEvents } = useEventStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<JobEvent[]>([]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredEvents(
        events.filter(
          (event) =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredEvents(events);
    }
  }, [events, searchTerm]);

  const upcomingEvents = filteredEvents.filter(
    (event) => new Date(event.startDate) >= new Date()
  );

  const formatEventDate = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const sameDay = start.toDateString() === end.toDateString();
    
    if (sameDay) {
      return `${format(start, 'MMMM d, yyyy')} · ${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
    }
    
    return `${format(start, 'MMMM d')} - ${format(end, 'MMMM d, yyyy')}`;
  };

  const getEventTypeLabel = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Upcoming Events</h1>
          <p className="text-muted-foreground mb-8">
            Connect with employers and enhance your career prospects through these events
          </p>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Events List */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-pulse-slow inline-block">
                  <Calendar className="w-10 h-10 text-muted-foreground mb-2 mx-auto" />
                </div>
                <p className="text-muted-foreground">Loading events...</p>
              </div>
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <Link 
                  key={event.id} 
                  to={`/events/${event.id}`}
                  className="block group"
                >
                  <div className="bg-card border border-border rounded-lg overflow-hidden hover-scale">
                    <div className="md:flex">
                      <div className="md:w-1/3 bg-muted h-48 md:h-auto flex items-center justify-center">
                        <CalendarIcon className="h-16 w-16 text-muted-foreground" />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {getEventTypeLabel(event.type)}
                          </span>
                        </div>
                        <h2 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                          {event.title}
                        </h2>
                        <div className="flex items-center text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="text-sm">
                            {formatEventDate(event.startDate, event.endDate)}
                          </span>
                        </div>
                        <div className="flex items-center text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        <p className="text-muted-foreground line-clamp-2 mb-4">
                          {event.description}
                        </p>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/30 rounded-lg">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No upcoming events found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm
                  ? "No events match your search criteria. Try adjusting your search."
                  : "There are no upcoming events at the moment. Please check back later."}
              </p>
              {searchTerm && (
                <Button onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default EventsPage;
