import Sidebar from "@/components/ui/Sidebar"
import { Outlet } from "react-router-dom"

function SecureLayout() {
    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default SecureLayout