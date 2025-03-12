const checkRole = (roles) => {
    return (req, res, next) => {
        // GET USER ROLE FROM REQUEST
        const userROLE = req?.user?.role;

        const allowedRoleInString = roles.reduce((acc, role) => acc + " " + role)

        const msg = `ACCESS DENIED, ALLOWED ONLY : [${allowedRoleInString}], AND YOU ARE ${userROLE}`

        // CHECK IF USER ROLE INCLUDE IN ALLOWRD ROLES
        if (!roles.includes(userROLE)) return res.status(403).send({ error: msg })

        next()
    }
}

module.exports = checkRole