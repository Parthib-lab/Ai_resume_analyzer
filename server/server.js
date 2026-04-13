
import dns from 'dns';
dns.setServers(["1.1.1.1","8.8.8.8"]);
import dotenv from "dotenv";
dotenv.config();
//import "dotenv/config";
import express from 'express';
import cors from "cors";
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

console.log("ENV TEST:", process.env.MONGODB_URI);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();
const PORT=process.env.PORT || 3000;

// Database Connection - using .then() to avoid top-level await issues in some environments
connectDB().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB Connection Error:", err);
});

app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "npx plugins add vercel/vercel-plugin"
  ],
  credentials: true
}));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/users',userRouter);
app.use('/api/resumes',resumeRouter);
app.use('/api/ai',aiRouter);

app.get('/',(req,res)=>res.send("Server is live..."));

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});