import { Link } from "react-router-dom"; // If using React Router
import { Menu, Briefcase, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Sidebar() {
    return (
        <div className="h-screen w-64 bg-gray-900 text-white fixed hidden md:flex flex-col p-4 space-y-6">
            {/* Logo */}
            <div className="text-2xl font-bold text-center">🚀 Logo</div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-4">
                <SidebarLink to="/" icon={<Menu size={20} />} text="Dashboard" />
                <SidebarLink to="/jobs" icon={<Briefcase size={20} />} text="Jobs" />
                <SidebarLink to="/candidates" icon={<Users size={20} />} text="Candidates" />
                <SidebarLink to="/settings" icon={<Settings size={20} />} text="Settings" />
            </nav>
        </div>
    );
}

// Sidebar Link Component
function SidebarLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
    return (
        <Link to={to} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700">
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
