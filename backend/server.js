require('dotenv').config()

const express = require('express')
const cors = require('cors');

const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

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
app.use('/api/user', userRoutes)

prisma
    .$connect()
    .then(() => {
        // listen for requests
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`connected to db & listening on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });

