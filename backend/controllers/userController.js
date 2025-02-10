const prisma = require('../prismaClient')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '2h' })
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

        const token = createToken(user.id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // validation 
        if (!email || !password) {
            return res.status(400).json({ error: "Veuillez remplir tout les champs!" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "E-mail invalide!" });
        }

        const user = await prisma.user.findFirst({
            where: { email: email }
        });

        if (!user) {
            return res.status(400).json({ error: "E-mail incorrect." })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(400).json({ error: "Password incorrect." })
        }

        const token = createToken(user.id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    loginUser,
    signupUser
}