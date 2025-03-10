import Sidebar from "@/components/ui/Sidebar"
import { Outlet } from "react-router-dom"

function RootLayout() {
    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default RootLayout