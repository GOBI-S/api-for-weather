import express from 'express';
import emailRoute from './api/email.js';
import connectdb from './lib/database.js';
import cors from 'cors';

const app = express();
const PORT = 2000;

// Enable CORS for all origins
app.use(cors());

// Data understanding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the email route
app.use('/email', emailRoute);

// Connect to the database
connectdb().catch(err => {
  console.error('Database connection failed', err);
  process.exit(1);  // Exit process on DB connection failure
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Server is shutting down...');
  process.exit(0);
});
