import mongoose from "mongoose"

const dbConnect = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Connected to db!");
        })

        mongoose.connection.on("error", (err) => {
            console.log("Error while connecting to db ", err)
        })

        await mongoose.connect(process.env.DB_URI);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default dbConnect;