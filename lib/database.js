import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const connetdb= async() =>{
    try {
        await mongoose.connect(process.env.mongo_uri);
        console.log("db connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }
}
export default connetdb