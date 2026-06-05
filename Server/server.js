import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './Routes/adminRoutes.js';
import blogRouter from './Routes/blogRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL
  ],
  credentials: true
}))
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send("API is working"))
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)

// Connect DB then start server
connectDB().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000')
  })
}).catch(err => {
  console.error('DB connection failed:', err)
})

export default app;