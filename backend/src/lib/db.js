import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongo DB connected ${connect.connection.host}`)
    } catch (error) {
        console.log("Error connecting to Mongo DB",error)
        process.exit(1)   
    }
}