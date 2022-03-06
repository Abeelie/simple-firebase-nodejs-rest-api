"use strict";

const express = require('express');
const app = express()
const morgan = require("morgan");
const dotenv = require('dotenv').config();
const helmet = require("helmet");
const todoRoutes = require('./routes/todoRoutes');

// using middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());

app.use('/api/v1/todo', todoRoutes);


app.use((err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
})



module.exports = app;