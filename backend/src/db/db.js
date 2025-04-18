import mongoose from "mongoose";

const connectDB=async () => {
    // console.log(process.env.MONGODB_URI)
    try {
        
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n Mongodb connected!!! DB HOST: ${
            connectionInstance.connection.host
        } `);
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1)
    }
}

export default connectDB