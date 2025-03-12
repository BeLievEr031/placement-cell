
import express from "express"
import cors from "cors"
import jobRouter from "./routes/jobRoutes.js";
import applicantsRouter from "./routes/applicantsRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import trainingRouter from "./routes/trainingRoutes.js";
import lectureRouter from "./routes/lectureRoutes.js";
import purchaseRouter from "./routes/purchaseRoutes.js";
import paymentRouter from "./controller/paymentController.js";
import ApplicantModel from "./model/ApplicantModel.js";
import JobModel from "./model/JobModel.js";
import EventModel from "./model/EventModel.js";
import Training from "./model/trainingModel.js";
import LectureModel from "./model/LectureModel.js";
import PurchaseModel from "./model/PurchaseModel.js";
import nodemailer from "nodemailer";
const app = express();

app.use(express.json({ limit: "1MB" }))
app.use(express.urlencoded({ extended: true, limit: "1MB" }))
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174"]
}))

app.use("/api/v1/placement/job", jobRouter)
app.use("/api/v1/placement/applicants", applicantsRouter)
app.use("/api/v1/placement/event", eventRouter)
app.use("/api/v1/placement/training", trainingRouter)
app.use("/api/v1/placement/lecture", lectureRouter)
app.use("/api/v1/placement/purchase", purchaseRouter)
app.use("/api/v1/placement/payment", paymentRouter)

app.get("/api/v1/placement/stats", async (req, res) => {
    const applicantsCount = await ApplicantModel.countDocuments();
    const jobCount = await JobModel.countDocuments();
    const eventCount = await EventModel.countDocuments();
    const trainingCount = await Training.countDocuments();
    const lectureCount = await LectureModel.countDocuments();
    const result = await PurchaseModel.aggregate([
        {
            $group: {
                _id: null,  // No grouping, just sum everything
                totalAmount: { $sum: "$amount" },
            },
        },
    ]);

    const amount = result.length > 0 ? result[0].totalAmount : 0;

    res.status(200).json({
        applicantsCount,
        jobCount,
        eventCount,
        trainingCount,
        lectureCount,
        amount
    })
})



const transporter = nodemailer.createTransport({
    service: 'gmail', // or use SMTP settings
    auth: {
        user: "believerdev031@gmail.com", // Your email
        pass: "ftmqphozzocextnc"  // Your email app password
    }
});

// Function to send an email
const sendEmail = async (toEmail, name, status) => {
    let subject, message;

    if (status === "shortlisted") {
        subject = "Congratulations! Your Resume is Shortlisted";
        message = `<p>Dear ${name},</p>
                   <p>We are pleased to inform you that your resume has been shortlisted for the next round.</p>
                   <p>Our HR team will contact you soon regarding the interview schedule.</p>
                   <p>Best Regards,<br>HR Team</p>`;
    } else {
        subject = "Application Status: Not Selected";
        message = `<p>Dear ${name},</p>
                   <p>Thank you for applying. After careful review, we regret to inform you that you have not been selected.</p>
                   <p>We encourage you to apply again in the future.</p>
                   <p>Best Regards,<br>HR Team</p>`;
    }

    const mailOptions = {
        from: "believerdev031@gmail.com",
        to: toEmail,
        subject: subject,
        html: message
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${toEmail}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};


app.post("/api/v1/placement/notify", async (req, res) => {
    const { _id, name, email, status } = req.body;
    try {
        const applicant = await ApplicantModel.findOne({ _id })

        if (status === "shortlisted") {
            applicant.status = "accept";

        } else {
            applicant.status = "reject";
        }

        await applicant.save();
        await sendEmail(email, name, status);
        res.status(200).json({
            success: true,
            message: "Email has been sent."
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

export default app;
