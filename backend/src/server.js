import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'

//API Router
import authRouter from './routes/auth.routes.js'

dotenv.config( )
const app = express()


app.use('/api/auth',authRouter);


app.listen(process.env.PORT,() => {
    console.log(`Server is running on ${process.env.PORT}`)
    connectDB()
})