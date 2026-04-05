const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./modules/user/user.routes');
const recordRoutes = require('./modules/record/record.routes');
const dashboardRoutes = require('./modules/dashboard/dashboard.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/dashboard', dashboardRoutes);

module.exports = app;