import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FileText } from "lucide-react";

interface Applicant {
    id: number;
    name: string;
    phone: string;
    address: string;
    resumeUrl: string;
}

export default function ApplicantsPage() {
    const [selectedResume, setSelectedResume] = useState<string | null>(null);

    const applicants: Applicant[] = [
        { id: 1, name: "John Doe", phone: "123-456-7890", address: "New York, USA", resumeUrl: "/resumes/john-doe.pdf" },
        { id: 2, name: "Jane Smith", phone: "987-654-3210", address: "San Francisco, USA", resumeUrl: "/resumes/jane-smith.pdf" },
        { id: 3, name: "Mike Johnson", phone: "555-666-7777", address: "Los Angeles, USA", resumeUrl: "/resumes/mike-johnson.pdf" },
    ];

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
                                <TableRow key={applicant.id}>
                                    <TableCell>{applicant.name}</TableCell>
                                    <TableCell>{applicant.phone}</TableCell>
                                    <TableCell>{applicant.address}</TableCell>
                                    <TableCell>
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
                                                        src={"https://aspirant-lms-bucket.s3.ap-south-1.amazonaws.com/uploads/1740303057635-GRADE-11%2C%20MATHS%20FINAL%20EXAM.%20Final%20AK.pdf"}
                                                        className="w-full h-[500px] mt-4"
                                                        title="Resume PDF"
                                                    />
                                                ) : (
                                                    <p className="text-gray-500 text-center mt-6">No resume selected</p>
                                                )}
                                            </SheetContent>
                                        </Sheet>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
