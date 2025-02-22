require('dotenv').config()

const allowedOrigins = [`http://localhost:${process.env.PORT}`];


module.exports = allowedOrigins;