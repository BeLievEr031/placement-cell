import { useState } from "react";
import { Play, Video, CheckCircle } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { useFetchSinglePurchaseQuery } from "@/hooks/usePurchase";
import { useUser } from "@clerk/clerk-react";
import { useLocation, useParams } from "react-router-dom";
import CourseCard from "./CourseCard";

const lessons = [
    { id: 1, title: "Introduction to Resume Building", duration: "10:32", url: "https://www.example.com/video1.mp4" },
    { id: 2, title: "Structuring Your Resume", duration: "15:21", url: "https://www.example.com/video2.mp4" },
    { id: 3, title: "Writing Effective Cover Letters", duration: "12:45", url: "https://www.example.com/video3.mp4" },
];

interface Course {
    _id: string;
    title: string;
    level: string;
    duration: string;
    price: number;
    description: string;
}

export default function AccessResource() {
    const { id } = useParams<{ id: string }>()
    const { user } = useUser();
    const [isPay, setPay] = useState(false)
    const { data } = useFetchSinglePurchaseQuery({ clerkId: user?.id, courseId: id });

    console.log(data?.data?.data);
    const location = useLocation();
    const resource = location.state?.resource;
    console.log(resource);

    const [currentLesson, setCurrentLesson] = useState(lessons[0]);
    return (
        <PageLayout hideFooter={true}>

            {
                data?.data?.data.length === 0 ?
                    <div className="flex justify-center h-screen items-center">
                        <CourseCard course={resource as Course} setPay={setPay} isPay={isPay} />
                    </div>
                    :
                    <div className="flex h-screen">
                        {/* Sidebar */}
                        <aside className="w-1/4 p-4 bg-gray-100 border-r overflow-auto">
                            <h2 className="text-lg font-semibold mb-4">Course Lessons</h2>
                            <ul>
                                {lessons.map((lesson) => (
                                    <li
                                        key={lesson.id}
                                        onClick={() => setCurrentLesson(lesson)}
                                        className={`p-3 flex items-center gap-2 cursor-pointer rounded-lg mb-2 transition-all ${currentLesson.id === lesson.id ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-200"
                                            }`}
                                    >
                                        <Video size={20} />
                                        <span>{lesson.title}</span>
                                        <span className="ml-auto text-sm">{lesson.duration}</span>
                                        {currentLesson.id === lesson.id && <CheckCircle size={18} />}
                                    </li>
                                ))}
                            </ul>
                        </aside>

                        {/* Video Player */}
                        <main className="flex-1 p-6 flex flex-col">
                            <div className="relative w-full h-[60vh] bg-black rounded-lg overflow-hidden">
                                <video controls className="w-full h-full">
                                    <source src={currentLesson.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            {/* Lesson Details */}
                            <div className="mt-4">
                                <h1 className="text-2xl font-semibold flex items-center gap-2">
                                    <Play size={24} /> {currentLesson.title}
                                </h1>
                                <p className="text-gray-600 mt-2">Duration: {currentLesson.duration}</p>
                            </div>
                        </main>
                    </div>
            }

        </PageLayout>

    );
}
