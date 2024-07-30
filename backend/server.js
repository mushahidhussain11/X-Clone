import express from "express";
import dotenv from "dotenv";
import path from "path";
const app = express(); 
import {v2 as cloudinary} from "cloudinary";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import notificationRoutes from "./routes/notification.route.js"
import connectToMongoDB from "../db/connectMongoDb.js";
import cookieParser from "cookie-parser";
app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/notifications",notificationRoutes);
const __dirname = path.resolve();
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRRET
})

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// console.log(process.env.MONGO_URI);
app.use(express.json());
app.listen(8000,()=>{
    console.log("Server is running on the port 8000")
    connectToMongoDB();
})