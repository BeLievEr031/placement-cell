import { Link, useLocation } from "react-router-dom"; // Import useLocation for active link detection
import { Menu, Briefcase, Users, Rotate3d, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Sidebar() {
    const location = useLocation(); // Get current URL

    return (
        <div className="h-screen w-64 bg-gray-900 text-white fixed hidden md:flex flex-col p-4 space-y-6">
            {/* Logo */}
            <div className="text-2xl font-bold text-center">🚀 Logo</div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-4">
                <SidebarLink to="/" icon={<Menu size={20} />} text="Dashboard" active={location.pathname === "/"} />
                <SidebarLink to="/jobs" icon={<Briefcase size={20} />} text="Jobs" active={location.pathname === "/jobs"} />
                {/* <SidebarLink to="/candidates" icon={<Users size={20} />} text="Candidates" active={location.pathname === "/candidates"} /> */}
                <SidebarLink to="/events" icon={<CalendarDays size={20} />} text="Events" active={location.pathname === "/events"} />
                <SidebarLink to="/training" icon={<Rotate3d size={20} />} text="Training" active={location.pathname === "/training" || location.pathname.includes("add-videos")} />
                <SidebarLink to="/profile" icon={<Users size={20} />} text="Profile" active={location.pathname === "/profile"} />
            </nav>
        </div>
    );
}

// Sidebar Link Component with Active State
function SidebarLink({ to, icon, text, active }: { to: string; icon: React.ReactNode; text: string; active: boolean }) {
    return (
        <Link
            to={to}
            className={`flex items-center space-x-3 p-2 rounded-md transition ${active ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                }`}
        >
            {icon}
            <span>{text}</span>
        </Link>
    );
}

// Mobile Sidebar
export function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden">
                    <Menu size={24} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-gray-900 text-white w-64 p-4">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}
