
import mongoose from "mongoose";
const connectDB = async(URI)=>{
    try {
        await mongoose.connect(URI);
        console.log('Connected to mongodb')    
    } catch (error) {
        console.error('error in connecting to database', error);
    }
    
}
export default connectDB;