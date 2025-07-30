import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js'

//API Router
import authRouter from './routes/auth.routes.js'

dotenv.config( )
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/auth',authRouter);


app.listen(process.env.PORT,() => {
    console.log(`Server is running on ${process.env.PORT}`)
    connectDB()
})