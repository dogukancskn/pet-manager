const Pet = require('../models/pet.model');
const Vaccination = require('../models/vaccination.model');

exports.createPet = async (req, res) => {
    try {
        const {
            name,
            type,
            breed,
            tagNo,
            birthDate,
            gender
        } = req.body;

        if (!name || !type) {
            return res.status(400).json({
                message: "İsim ve tür zorunlu",
            });
        }

        const pet = await Pet.create({
            name,
            type,
            breed,
            tagNo,
            birthDate,
            gender,
            userId: req.user.id,
        });

        res.status(201).json({
            success: true,
            data: pet
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hata oluştu" });
    }
}

exports.getMyPets = async (req, res) => {
    try {
        const pets = await Pet.findAll({
            where: { userId: req.user.id },
            include: [Vaccination]
        });

        res.status(200).json({
            success: true,
            data: pets
        })
    } catch (error) {
        res.status(500).json({ message: "Hata oluştu" });
    }
}

exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            },
             include: [Vaccination]
        });

        if (!pet) {
            return res.status(404).json({
                message: "Pet bulunamadı",
            });
        }

        res.status(200).json({
            success: true,
            data: pet
        })
    } catch (error) {
        res.status(500).json({ message: "Hata oluştu" });
    }
}

exports.updatePet = async (req, res) => {
    try {
        const pet = await Pet.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!pet) {
            return res.status(404).json({
                message: "Pet bulunamadı",
            });
        }

        const {
            name,
            type,
            breed,
            tagNo,
            birthDate,
            gender
        } = req.body;

        await pet.update({
            name,
            type,
            breed,
            tagNo,
            birthDate,
            gender
        });

        res.status(200).json({
            success: true,
            data: pet
        })
    } catch (error) {
        res.status(500).json({ message: "Hata oluştu" });
    }
}

exports.deletePet = async (req, res) => {
    try {
        const pet = await Pet.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id,
            },
        });

        if (!pet) {
            return res.status(404).json({
                message: "Pet bulunamadı",
            });
        }

        await pet.destroy();

        res.json({
            message: "Pet silindi",
        });

    } catch (error) {
        res.status(500).json({ message: "Hata oluştu" });
    }
}