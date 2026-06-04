import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './Routes/adminRoutes.js';
import blogRouter from './Routes/blogRoutes.js';
import imagekit from './configs/imagekit.js';
const app=express();
await connectDB()

//MiddleWare
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

//Routes
app.get('/',(req,res)=>
res.send("API is working"));
app.use('/api/admin',adminRouter);
app.use('/api/blog',blogRouter)

const PORT=3000;

app.listen(PORT,()=>{
    console.log('server is runnning on port '+PORT)
})



export default app;
