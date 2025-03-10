import { Briefcase, Users, CalendarDays, Building, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="p-6 space-y-6 ml-64">
            <h1 className="text-2xl font-bold">Placement Cell Dashboard</h1>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <OverviewCard icon={<Briefcase size={28} />} title="Total Jobs" count="124" color="bg-blue-600" />
                <OverviewCard icon={<Users size={28} />} title="Total Candidates" count="430" color="bg-green-600" />
                <OverviewCard icon={<CalendarDays size={28} />} title="Interviews Scheduled" count="28" color="bg-yellow-600" />
                <OverviewCard icon={<Building size={28} />} title="Companies" count="58" color="bg-purple-600" />
            </div>

            {/* Recent Jobs & Upcoming Interviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RecentJobs />
                <UpcomingInterviews />
            </div>
        </div>
    );
}

// Overview Card Component
function OverviewCard({ icon, title, count, color }: { icon: React.ReactNode; title: string; count: string; color: string }) {
    return (
        <Card className={`p-4 text-white ${color} rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="text-3xl font-bold">{count}</p>
                </div>
                <div>{icon}</div>
            </div>
        </Card>
    );
}

// Recent Jobs Table
function RecentJobs() {
    const jobs = [
        { id: 1, title: "Software Engineer", company: "Google", location: "Remote" },
        { id: 2, title: "Product Manager", company: "Amazon", location: "New York" },
        { id: 3, title: "Data Analyst", company: "Microsoft", location: "Seattle" },
    ];

    return (
        <Card>
            <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Recent Job Postings</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Location</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.company}</TableCell>
                                <TableCell>{job.location}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Link to="/jobs" className="flex items-center mt-4 text-blue-600 hover:underline">
                    View All Jobs <ChevronRight size={18} className="ml-2" />
                </Link>
            </CardContent>
        </Card>
    );
}

// Upcoming Interviews List
function UpcomingInterviews() {
    const interviews = [
        { id: 1, candidate: "John Doe", company: "Google", date: "March 15, 2025" },
        { id: 2, candidate: "Jane Smith", company: "Amazon", date: "March 17, 2025" },
    ];

    return (
        <Card>
            <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Upcoming Interviews</h2>
                <ul className="space-y-3">
                    {interviews.map((interview) => (
                        <li key={interview.id} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                            <div>
                                <p className="font-semibold">{interview.candidate}</p>
                                <p className="text-sm text-gray-600">{interview.company}</p>
                            </div>
                            <span className="text-sm text-gray-700">{interview.date}</span>
                        </li>
                    ))}
                </ul>
                <Link to="/interviews" className="flex items-center mt-4 text-blue-600 hover:underline">
                    View All Interviews <ChevronRight size={18} className="ml-2" />
                </Link>
            </CardContent>
        </Card>
    );
}
