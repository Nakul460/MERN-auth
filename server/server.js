import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import cookieParser  from 'cookie-parser';
import connectdb from './config/mongodb.js';
import userModel from './models/user_models.js';
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000
connectdb(); 

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true,origin:allowedOrigins}));

// API endpoints
app.get('/',(req,res) =>{
    res.send("API Working");
})
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);

app.listen(4000,()=>{
    console.log(`server stared on PORT:${port}`);
})
