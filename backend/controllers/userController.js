const prisma = require('../prismaClient')
const bcrypt = require('bcrypt')
const validator = require('validator')

// login user
const loginUser = async (req, res) => {
    res.json({ msg: 'login user' })
}

// signup user
const signupUser = async (req, res) => {
    const { name, email, password } = req.body

    try {

        // validation 
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Veuillez remplir tout les champs!" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "E-mail invalide!" });
        }
        // if (!validator.isStrongPassword(password)) {
        //     return res.status(400).json({ error: "Password n'est pas fort!" });
        // }
        if (!validator.isLength(password, { min: 4 })) {
            return res.status(400).json({ error: "Password doit être au minimum de 4 caractères!" });
        }

        const exists = await prisma.user.findFirst({
            where: { email: email }
        });

        if (exists) {
            return res.status(400).json({ error: "E-mail déjà utilisé." })
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        const user = await prisma.user.create({
            data: { name, email, password: hash }
        });

        res.status(200).json({ email, user })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    loginUser,
    signupUser
}