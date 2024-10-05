import express from 'express';
import { PORT, mongodbURL } from './config.js';
import mongoose from 'mongoose';
import articlesRoute from './routes/articlesRoute.js';
import usersRoute from './routes/usersRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Parse cookies from the request headers

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Adjust if necessary
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true // Enable cookies to be sent and received
}));

// Routes
app.use('/articles', articlesRoute);
app.use('/user', usersRoute);

// Connect to MongoDB and start server
mongoose.connect(mongodbURL)
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
