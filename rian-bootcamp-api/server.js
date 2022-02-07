const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to NoSQL database
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// DEV logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} node on port ${PORT}`.magenta
      .bold
  )
);

// Handle unhandled rejection
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`.red);

  // Close server & exit process
  server.close(() => process.exit(1));
});
