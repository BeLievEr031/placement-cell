import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FileText } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { sendEmailMessage } from "@/http/api";
import { toast, Toaster } from "sonner";

export interface Applicant {
    _id?: string;
    id: number;
    name: string;
    phone: string;
    address: string;
    resumeUrl: string;
    status?: string;
}

export default function ApplicantsPage() {
    const { id } = useParams<{ id: string }>()
    const [selectedResume, setSelectedResume] = useState<string | null>(null);
    const [isStatus, setStatus] = useState(false)
    const [applicants, setApplicants] = useState<Applicant[] | []>([])

    // const applicants: Applicant[] = [
    //     { id: 1, name: "John Doe", phone: "123-456-7890", address: "New York, USA", resumeUrl: "/resumes/john-doe.pdf" },
    //     { id: 2, name: "Jane Smith", phone: "987-654-3210", address: "San Francisco, USA", resumeUrl: "/resumes/jane-smith.pdf" },
    //     { id: 3, name: "Mike Johnson", phone: "555-666-7777", address: "Los Angeles, USA", resumeUrl: "/resumes/mike-johnson.pdf" },
    // ];


    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await axios.get(`http://localhost:5000/api/v1/placement/applicants/${id}`)
                console.log(data.data);
                setApplicants(data.data)
            } catch (error) {
                console.log(error);
            }
        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStatus])

    const handleAcceptReject = async (type: string, info: Applicant) => {
        if (type === "accept") {
            const data: Applicant = {
                ...info,
                status: "shortlisted"
            }

            toast.success("Apllication shortlisted.")
            await sendEmailMessage(data);
        } else {
            const data: Applicant = {
                ...info,
                status: "rejected"
            }
            toast.success("Apllication rejected.")
            await sendEmailMessage(data);
        }
        setStatus(!isStatus)
    }

    return (
        <div className="p-6 space-y-6 ml-64">
            <h1 className="text-2xl font-bold">Applicants List</h1>

            <Card>
                <CardContent className="p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Resume</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applicants.map((applicant) => (
                                <TableRow key={applicant._id}>
                                    <TableCell>{applicant.name}</TableCell>
                                    <TableCell>{applicant.phone}</TableCell>
                                    <TableCell>{applicant.address}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setSelectedResume(applicant.resumeUrl)}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <FileText size={16} /> <span>View Resume</span>
                                                </Button>
                                            </SheetTrigger>
                                            <SheetContent side="right" className="">
                                                <div className="flex justify-between items-center p-4 border-b">
                                                    <h2 className="text-lg font-semibold">Resume Viewer</h2>
                                                </div>
                                                {selectedResume ? (
                                                    <iframe
                                                        src={selectedResume}
                                                        className="w-full h-[500px] mt-4"
                                                        title="Resume PDF"
                                                    />
                                                ) : (
                                                    <p className="text-gray-500 text-center mt-6">No resume selected</p>
                                                )}
                                            </SheetContent>
                                        </Sheet>
                                        <Button className="bg-green-800"
                                            disabled={applicant.status === "accept" ? true : false}
                                            onClick={() => handleAcceptReject("accept", applicant)
                                            }
                                        >{applicant.status === "accept" ? "Accepted" : "Accept"}</Button>
                                        <Button variant={"destructive"}
                                            onClick={() => handleAcceptReject("reject", applicant)}
                                        >{applicant.status === "reject" ? "Rejected" : "Reject"}</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Toaster />
        </div>
    );
}
