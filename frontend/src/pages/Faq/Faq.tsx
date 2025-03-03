import PageLayout from "@/components/layout/PageLayout";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import React from "react";

const FAQ = () => {
    return (
        <PageLayout hideFooter={true}>
            <div className="max-w-2xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible>
                    <AccordionItem value="question1">
                        <AccordionTrigger className="text-lg font-medium">What is PlacementHub?</AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                            PlacementHub is an online platform that connects students with job opportunities, training programs, and recruitment events.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="question2">
                        <AccordionTrigger className="text-lg font-medium">How do I apply for a job?</AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                            You can apply by creating a profile, uploading your resume, and clicking "Apply" on the job listing.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div >
        </PageLayout>
    );
};

export default FAQ;
