const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const prisma = require('../prismaClient')

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
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

        // check if user exist, by email
        const foundedUser = await prisma.user.findFirst({ where: { email } });
        if (foundedUser) {
            return res.status(401).json({ error: "E-mail déjà utilisé." })
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // create user
        const createdUser = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });

        const accessToken = jwt.sign({
            UserInfo: {
                id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign({
            UserInfo: {
                id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email
            }
        },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('jwt', refreshToken, {
            httpOnly: true, // accessible only by web server
            secure: true, // https
            sameSite: "None", // cross-site cookie
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
        });

        res.status(201).json({
            token: accessToken,
            accessToken,
            email: createdUser.email,
            name: createdUser.name
        });

    } catch (error) {
        console.log(error);

        res.status(400).json({ error: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // validation 
        if (!email || !password) {
            return res.status(400).json({ error: "Veuillez remplir tout les champs!" });
        }
        if (!validator.isEmail(email)) {
            return res.status(401).json({ error: "E-mail invalide!" });
        }

        // check if user exist by email
        const foundedUser = await prisma.user.findFirst({ where: { email } });
        if (!foundedUser) {
            return res.status(401).json({ error: "E-mail incorrect." })
        }

        // check if password is correct
        const match = await bcrypt.compare(password, foundedUser.password)
        if (!match) return res.status(401).json({ error: "Password incorrect." })

        await setLastViste(email)

        const accessToken = jwt.sign(
            {
                UserInfo: {
                    id: createdUser.id,
                    name: createdUser.name,
                    email: createdUser.email
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            {
                UserInfo: {
                    id: createdUser.id,
                    name: createdUser.name,
                    email: createdUser.email
                },
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );
        res.cookie('jwt', refreshToken, {
            httpOnly: true, //accessible only by web server
            secure: true, //https
            sameSite: 'None', //cross-site cookie
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
        });
        res.json({
            accessToken,
            email: foundedUser.email,
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const refresh = async (req, res) => {
    const cookies = req.cookies;
    // check if token exist
    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
    const refreshToken = cookies.jwt;
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) res.status(403).json({ message: "Forbidden" });

            // check if user exist
            const foundedUser = await prisma.user.findFirst({
                where: { id: decoded.UserInfo.id }
            });
            if (!foundedUser) res.status(401).json({ message: "Unauthorized" });

            const accessToken = jwt.sign({
                UserInfo: {
                    id: createdUser.id,
                    name: createdUser.name,
                    email: createdUser.email
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            res.status(200).json({ accessToken });

        })
}

const logout = (req, res) => {
    const cookies = req.cookies;
    // check if cookie exist
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
    })
    return res.status(200).json({ message: "Cookie cleard" });
}

const setLastViste = async (email) => {

    try {
        await prisma.user.update({
            where: { email: email },
            data: { lastVisite: new Date().toISOString() },
            omit: { password: true }
        });
    } catch (error) {
        return error.message
    }
}

module.exports = {
    register,
    login,
    refresh,
    logout
}