require('dotenv').config()

const express = require('express')

const cors = require('cors');
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const prisma = require("./prismaClient");

const userRoutes = require('./routes/user')
const workoutRoutes = require('./routes/workouts')
const sitesRoutes = require('./routes/sites');
const typeparcsRoutes = require('./routes/typeparcs');
const parcsRoutes = require('./routes/parcs');
const enginsRoutes = require('./routes/engins');

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

// Serve Swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, { explorer: true }));

// routes
app.use('/user', userRoutes)
app.use('/workouts', workoutRoutes)
app.use('/sites', sitesRoutes)
app.use('/typeparcs', typeparcsRoutes)
app.use('/parcs', parcsRoutes)
app.use('/engins', enginsRoutes)

// PRISMA & RUN SERVER
prisma
    .$connect()
    .then(() => {
        // listen for requests
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`connected to db & listening on port ${PORT}`);
            console.log(`http://localhost:${PORT}/`);
        })
    })
    .catch((error) => {
        console.log(error);
    });

