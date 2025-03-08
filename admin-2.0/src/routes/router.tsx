import RootLayout from "@/layout/RootLayout";
import SecureLayout from "@/layout/SecureLayout";
// import Home from "@/pages/Home/Home";
import JobManager from "@/pages/Jobs/Jobs";
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "",
        element: <RootLayout />,
        children: [
            {
                path: "",
                element: <SecureLayout />,
                children: [
                    {
                        path: "",
                        element: <JobManager />
                    }
                ]
            }
        ]
    }
])

export default router;