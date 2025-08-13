import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js'
import cors from 'cors'

//API Router
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import chatRouter from './routes/chat.routes.js'

dotenv.config( )
const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);
app.use('/api/chat',chatRouter);


app.listen(process.env.PORT,() => {
    console.log(`Server is running on ${process.env.PORT}`)
    connectDB()
})