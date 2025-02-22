const prisma = require('../prismaClient')
const jwt = require('jsonwebtoken')

const verifyJWT = async (req, res, next) => {
    console.log("verifyJWT");

    const authHeader = req.headers.authorization || req.headers.Authorization

    // check if content token
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'Unauthorized' })
    } else {

    }

    // extract token
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' })

        req.user = decoded.UserInfo.id
        next()
    })
}

module.exports = verifyJWT