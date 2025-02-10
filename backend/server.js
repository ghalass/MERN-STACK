require('dotenv').config()

const express = require('express')
const cors = require('cors');
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// middleware
app.use(express.json())

// Enable CORS for all origins
app.use(cors());

app.use(async (req, res, next) => {
    console.log(req.method, req.path);
    next();
})

// routes
app.use('/api/workouts', workoutRoutes)

prisma
    .$connect()
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`connected to db & listening on port ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });

