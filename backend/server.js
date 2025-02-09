require('dotenv').config()

const express = require('express')
const prisma = require('./prismaClient')
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// middleware
app.use(express.json())

app.use(async (req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/workouts', workoutRoutes)

prisma.$connect()
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`connected to db & listening on port ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });

