import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import JobsPage from "./pages/jobs/JobsPage";
import JobDetailPage from "./pages/jobs/JobDetailPage";
import JobFormPage from "./pages/jobs/JobFormPage";
import EventsPage from "./pages/events/EventsPage";
import TrainingPage from "./pages/training/TrainingPage";
import CommunicationPage from "./pages/communication/CommuncationPage";
import AccessResource from "./pages/training/AccessResource";
import FAQPage from "./pages/Faq/Faq";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Job Routes */}
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/new" element={<JobFormPage />} />
        <Route path="/jobs/edit/:id" element={<JobFormPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />

        {/* Event Routes */}
        <Route path="/events" element={<EventsPage />} />

        {/* Training Routes */}
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/training/:id" element={<AccessResource />} />
        <Route path="/communication" element={<CommunicationPage />} />

        <Route path="/faq" element={<FAQPage />} />

        {/* 404 Route - must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
