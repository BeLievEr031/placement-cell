import app from "./app.js";
import dotenv from "dotenv"
dotenv.config();
import dbConnect from "./db/dbConnect.js";

dbConnect().then(() => {
    const PORT = process.env.PORT | 5000;
    console.log(process.env.RAZORPAY_KEY_ID);

    app.listen(PORT, () => {
        console.log(`Connected to server at ${PORT}`);
    })
}).catch((err) => {
    console.log(err);
})

