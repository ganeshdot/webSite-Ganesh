import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import chatbotRoutes from './routes/chatbot.js';
import contactRoutes from './routes/contact.js';
import { resumeData } from './data/resumeData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatbotRoutes);
app.use('/api/contact', contactRoutes);

// Resume data route for the client to retrieve
app.get('/api/resume', (req, res) => {
  res.json(resumeData);
});

// Root Route
app.get('/', (req, res) => {
  res.send('Portfolio API Server is running...');
});

// Connect Database and Start Server
const startServer = async () => {
  // Attempt to connect to DB
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
