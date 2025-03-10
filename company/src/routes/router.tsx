import RootLayout from "@/layout/RootLayout";
import SecureLayout from "@/layout/SecureLayout";
import AddVideos from "@/pages/AddVideos/AddVideos";
import ApplicantsPage from "@/pages/Applicants/Applicants";
import EventManager from "@/pages/Event/Event";
import Home from "@/pages/Home/Home";
import JobManager from "@/pages/Jobs/Jobs";
import Training from "@/pages/Training/Training";
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
                        element: <Home />
                    },
                    {
                        path: "jobs",
                        element: <JobManager />
                    },
                    {
                        path: "training",
                        element: <Training />
                    },
                    {
                        path: "/add-videos/:id",
                        element: <AddVideos />
                    },
                    {
                        path: "events",
                        element: <EventManager />
                    },
                    {
                        path: "applicants/:id",
                        element: <ApplicantsPage />
                    },
                ]
            }
        ]
    }
])

export default router;