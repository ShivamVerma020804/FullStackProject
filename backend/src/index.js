import "./config.js";
import { app } from "./app.js";
import connectDB from "./db/index.js";

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:");
    console.error(err);
});

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:");
    console.error(err);
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGODB connection failed !!!", err);
    });