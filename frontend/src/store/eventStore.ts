
import { create } from 'zustand';

export type JobEvent = {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  organizer: string;
  type: 'job-fair' | 'workshop' | 'interview' | 'networking' | 'other';
  image?: string;
};

type EventState = {
  events: JobEvent[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
};

// Mock implementation - would connect to an API in production
export const useEventStore = create<EventState>((set) => ({
  events: [],
  loading: false,
  error: null,

  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      // Mock fetch delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockEvents: JobEvent[] = [
        {
          id: '1',
          title: 'Annual Campus Recruitment Fair',
          description: 'Connect with top employers from various industries.',
          location: 'University Main Hall',
          startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000),
          organizer: 'University Placement Cell',
          type: 'job-fair',
        },
        {
          id: '2',
          title: 'Technical Interview Workshop',
          description: 'Learn how to excel in technical interviews.',
          location: 'Engineering Building, Room 204',
          startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
          organizer: 'CS Department',
          type: 'workshop',
        },
        {
          id: '3',
          title: 'Industry Expert Panel Discussion',
          description: 'Insights into current industry trends and career paths.',
          location: 'Virtual Event',
          startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
          organizer: 'Alumni Association',
          type: 'networking',
        },
      ];
      
      set({ events: mockEvents, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch events', loading: false });
    }
  },
}));
