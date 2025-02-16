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
        if (!validator.isLength(password, { min: 6 })) {
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

        res.status(200).json({ email, name, token })
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

        res.status(200).json({ email, name: user.name, token })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// login user
const getByEmail = async (req, res) => {
    const { email } = req.body

    try {

        const user = await prisma.user.findFirst({
            where: { email: email },
            omit: { password: true },
        });

        if (!user) {
            return res.status(400).json({ error: "Utilisateur non trouvé!." })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// signup user
const changePassword = async (req, res) => {
    const { oldPassword, newPassword, email } = req.body

    try {
        // validation inputs
        if (!oldPassword || !newPassword || !email) {
            return res.status(400).json({ error: "Veuillez remplir tout les champs!" });
        }
        if (!validator.isLength(newPassword, { min: 6 })) {
            return res.status(400).json({ error: "Password doit être au minimum de 6 caractères!" });
        }
        // find the user
        const exists = await prisma.user.findFirst({
            where: { email: email }
        });

        // check is user email exist
        if (!exists) {
            return res.status(400).json({ error: "E-mail n'existe pas!" })
        }

        // check if actual password is correct
        const match = await bcrypt.compare(oldPassword, exists.password)
        if (!match) {
            return res.status(400).json({ error: "Password actuel est incorrect." })
        }

        // check if email is his email
        // user can change only his password
        // verify authentication
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(401).json({ error: 'Authorization token required!' })
        }
        const token = authorization.split(' ')[1]
        const { id } = jwt.verify(token, process.env.SECRET)
        if (exists.id !== id) {
            return res.status(400).json({ error: "Vous pouvez changer uniquement votre propre mot de passe!" })
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt)

        const updatedUser = await prisma.user.update({
            where: { email: email },
            data: { password: hash },
            omit: { password: true }
        });

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// get all users
const getUsers = async (req, res) => {
    try {

        // check if email is his email
        // user can change only his password
        // verify authentication
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(401).json({ error: 'Authorization token required!' })
        }
        const token = authorization.split(' ')[1]
        const { id } = jwt.verify(token, process.env.SECRET)

        // find role of user how send request
        const user = await prisma.user.findFirst({
            where: { id: id },
            select: { role: true }
        });
        // check if role is authorised
        // const allowed = (user.role === 'SUPER_ADMIN') || (user.role === 'ADMIN')
        const allowed = true
        // return res.status(200).json({ role: user.role, allowed: allowed });
        if (!allowed) {
            return res.status(400).json({ error: "Vous n'êtez pas autoriser." })
        }

        const users = await prisma.user.findMany({
            orderBy: [
                { role: 'asc' },
                { name: 'asc' },
                { active: 'desc' },
            ],
            omit: { password: true }
        });
        return res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// update a user
const updateUser = async (req, res) => {
    const { id, name, email, role, active } = req.body

    try {

        const selectedUSER = await prisma.user.findFirst({
            where: { email: email }, omit: { password: true }
        });

        const newData = {
            name: name.trim() !== "" ? name : selectedUSER.name,
            role: role.trim() !== "" ? role : selectedUSER.role,
            active: active,
        };

        // check if name is not already exist
        const nameExist = await prisma.user.findFirst({
            where: { name: name, id: { not: parseInt(id) } },

        });
        if (nameExist) {
            return res.status(401).json({ error: "Ce nom d'utilisateur est déjà utilisé!" })
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { name: newData.name, role: newData.role, active: newData.active }
        });

        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    loginUser,
    signupUser,
    getByEmail,
    changePassword,
    getUsers,
    updateUser
}