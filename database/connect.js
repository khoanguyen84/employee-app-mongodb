// const MONGO_URI = 'mongodb+srv://nguyenhuuanhkhoa:admin123@employee-app.3dabtyk.mongodb.net/'
import mongoose from "mongoose";

const connectMongo = async () => {
    try {
        const { connection } =  await mongoose.connect(process.env.MONGO_URI)
        if(connection.readyState == 1){
            console.log("Database Connected");
        }
    } catch (error) {
        return await Promise.reject(error)
    }
}

export default connectMongo;