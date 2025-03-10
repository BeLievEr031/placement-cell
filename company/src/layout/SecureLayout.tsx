import { Outlet } from "react-router-dom"

function SecureLayout() {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default SecureLayout