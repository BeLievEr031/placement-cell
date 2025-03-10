/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createPaymentOrder } from "@/http/api";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateNewPurchaseMutation } from "@/hooks/usePurchase";
import { useUser } from "@clerk/clerk-react";
import React from "react";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export interface CourseProps {
    course: {
        _id: string;
        title: string;
        level: string;
        duration: string;
        price: number;
        description: string;
    };
    setPay: React.Dispatch<React.SetStateAction<boolean>>;
    isPay: boolean;
}

interface IOrder {
    amount: number;
    currency: number;
    id: string;
}

const CourseCard: React.FC<CourseProps> = ({ course, isPay, setPay }) => {
    const { id } = useParams<{ id: string }>()
    const { user } = useUser();

    const navigate = useNavigate();
    const { mutate } = useCreateNewPurchaseMutation();

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        try {
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) {
                alert("Failed to load Razorpay. Please try again.");
                return;
            }

            const orderData = await createPaymentOrder({ id });
            const order: IOrder = orderData.data;

            const options = {
                key: "rzp_test_cMQQFYPaYpEzfm", // Replace with actual Razorpay Key ID
                amount: order.amount,
                currency: order.currency,
                name: "Your Company",
                description: "Test Transaction",
                order_id: order.id,
                handler: async () => {
                    mutate({ amount: course.price, courseId: course._id, clerkId: user!.id });

                    setTimeout(() => {
                        setPay(!isPay);
                        navigate("/training", { replace: true })
                    }, 1000)
                },

                prefill: {
                    name: "Aisha",
                    email: "aisha@gmail.com",
                    contact: "9999999999",
                },

                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card className="w-[500px] border rounded-2xl shadow-lg p-4">
            <CardHeader>
                <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-muted-foreground">{course.description}</p>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Level: <strong>{course.level}</strong></span>
                    <span>Duration: <strong>{course.duration}</strong></span>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-semibold">${course.price}</span>
                    <Button className="text-white" onClick={handlePayment}>Enroll Now</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default CourseCard;
