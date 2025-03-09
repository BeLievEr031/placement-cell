import app from "./app.js";
import dbConnect from "./db/dbConnect.js";

dbConnect().then(() => {
    const PORT = process.env.PORT | 5000;
    app.listen(PORT, () => {
        console.log(`Connected to server at ${PORT}`);
    })
}).catch((err) => {
    console.log(err);
})

