const prisma = require('../prismaClient')

// get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await prisma.workout
            .findMany({
                orderBy: { createdAt: 'desc' }
            });
        res.status(200).json(workouts)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params
    try {

        if (isNaN(id) || parseInt(id) != id) {
            return res.status(404).json({ error: "Enregistrement n'existe pas!" });
        }

        const workout = await prisma.workout.findFirst({
            where: { id: parseInt(id) }
        });

        if (!workout) {
            return res.status(404).json({ error: "Enregistrement n'existe pas!" })
        }

        res.status(200).json(workout)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// create new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyFields = [];

    if (!title) emptyFields.push('title')
    if (!load) emptyFields.push('load')
    if (!reps) emptyFields.push('reps')

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Veuillez remplir tout les champs!', emptyFields })
    }

    try {
        const exists = await prisma.workout.findFirst({
            where: { title: title }
        });

        if (exists) {
            return res.status(400).json({ error: 'Titre déjà utilisé' })
        }

        const workout = await prisma.workout.create({
            data: { title, load, reps }
        })
        res.status(201).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    try {

        if (isNaN(id) || parseInt(id) != id) {
            return res.status(404).json({ error: "Enregistrement n'est pas trouvé!" });
        }

        const workout = await prisma.workout.findFirst({
            where: { id: parseInt(id) }
        });

        if (!workout) {
            return res.status(404).json({ error: "Enregistrement n'existe pas!" })
        }

        await prisma.workout.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json(workout)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    const { title, load, reps } = req.body
    try {

        if (isNaN(id) || parseInt(id) != id) {
            return res.status(404).json({ error: "Enregistrement n'est pas trouvé!" });
        }

        const workout = await prisma.workout.findFirst({
            where: { id: parseInt(id) }
        });

        // check if title not already exist
        const titleExist = await prisma.workout.findFirst({
            where: { title: title, id: { not: parseInt(id) } },

        });
        if (titleExist) {
            return res.status(401).json({ error: "Titre déjà utilisé!" })
        }

        if (!workout) {
            return res.status(404).json({ error: "Enregistrement n'existe pas!" })
        }

        const updatedWorkout = await prisma.workout.update({
            where: { id: parseInt(id) },
            data: { title, load, reps }
        });

        res.status(200).json(updatedWorkout)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}