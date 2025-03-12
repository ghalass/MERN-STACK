const prisma = require('../prismaClient')
const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
    try {
        /**** METHOD 1 START */
        // GET & CHECK AUTHENTCATION FROM HEADERS
        // const { authorization } = req.headers
        // if (!authorization) {
        //     return res.status(401).json({ error: 'AUTHORIZATION TOKEN REQUIRED!' })
        // }

        // EXTRACT THE TOKEN FROM AUTHORIZATION HEADER
        // const tokenInHeader = authorization.split(' ')[1]
        /**** METHOD 1 END */

        /**** METHOD 2 START */
        // EXTRACT THE TOKEN FROM AUTHORIZATION HEADER
        const cookies = req.cookies;
        const tokenInCookie = cookies.jwt
        /**** METHOD 2 END */

        // GET USER HOW SEND THE REQUEST FROM TOKEN, FOR METHOD 1 USE tokenInHeader, FOR METHOD 2 USE tokenInCookie
        const userInToken = jwt.verify(tokenInCookie, process.env.ACCESS_TOKEN_SECRET)

        // CHECK IF USER EXIST IN DATABASE
        const checkedUser = await prisma.user.findUnique({
            where: { id: parseInt(userInToken?.id) },
            omit: { password: true, createdAt: true, updatedAt: true, lastVisite: true }
        })

        // IF USER EXIST IN DATABASE => SAVE HIM IN REQUEST
        if (checkedUser) req.user = checkedUser
        else return res.status(401).json({ error: 'USER NOT EXIST IN DATABASE!' })

        // PASS TO NEXT IF ALL IS WELL
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'REQUEST IS NOT AUTHORIZED!' })
    }
}

module.exports = requireAuth