const swaggerJSDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 5000;

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "ExpressJS API",
        version: "1.0.0",
        description: "API created by GHALASS",
    },
    servers: [
        {
            url: `http://localhost:${PORT}`, // Change this based on your environment
        },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
            BearerAuth: [], // Apply security globally
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;