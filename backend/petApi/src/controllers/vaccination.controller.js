const Pet = require('../models/pet.model');
const Vaccination = require('../models/vaccination.model');
const { Op } = require('sequelize');

exports.addVaccination = async (req, res) => {
    try {
        const { name, date, nextDate, note } = req.body;

        if (!name || !date) {
            return res.status(400).json({
                message: "Aşı adı ve tarih zorunlu",
            });
        }

        const pet = await Pet.findOne({
            where: {
                id: req.params.petId,
                userId: req.user.id
            }
        });

        if (!pet) {
            return res.status(404).json({
                message: "Hayvan bulunamadı"
            });
        }

        const vaccination = await Vaccination.create({
            name,
            date,
            nextDate,
            note,
            petId: pet.id
        });

        res.status(201).json({
            success: true,
            data: vaccination
        });
    } catch (error) {
        res.status(500).json({ message: "Hata oluştu" });
    }
}

exports.getDoneVaccines = async (req, res) => {
    try {

        const vaccines = await Vaccination.findAll({
            include: [{
                model: Pet,
                where: {
                    id: req.params.petId,
                    userId: req.user.id
                }
            }],
            where: {
                date: {
                    [Op.ne]: null
                }
            }
        });

        res.status(200).json({
            success: true,
            data: vaccines
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Hata oluştu"
        });
    }
};

exports.getUpcomingVaccines = async (req, res) => {
    try {
        const vaccines = await Vaccination.findAll({
            include: [{
                model: Pet,
                where: {
                    id: req.params.petId,
                    userId: req.user.id
                },
            }],

            where: {
                nextDate: {
                    [Op.gt]: new Date(),
                    [Op.lt]: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                }
            }
        });

        res.status(200).json({
            success: true,
            data: vaccines
        });
    } catch (error) {
        res.status(500).json({ message: "Hata oluştu" });
    }
}

exports.getOverdueVaccines = async (req, res) => {
    try {
        const vaccines = await Vaccination.findAll({
            include: [
                {
                    model: Pet,
                    where: {
                        id: req.params.petId,
                        userId: req.user.id
                    },
                },
            ],
            where: {
                nextDate: {
                    [Op.lt]: new Date(),
                },
            },
        });

        res.json(vaccines);

    } catch (error) {
        res.status(500).json({ message: "Hata oluştu" });
    }
};

exports.updateVaccination = async (req, res) => {
    try {
        const { name, date, nextDate, note } = req.body;

        const vaccination = await Vaccination.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Pet,
                where: {
                    userId: req.user.id
                }
            }]
        });

        if (!vaccination) {
            return res.status(404).json({
                message: "Aşı bulunamadı"
            });
        }

        if (!name || !date) {
            return res.status(400).json({
                message: "Aşı adı ve tarih zorunlu"
            });
        }

        await vaccination.update({
            name,
            date,
            nextDate,
            note
        });

        res.status(200).json({
            success: true,
            data: vaccination
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Aşı güncellenirken bir hata oluştu"
        });
    }
};

exports.getVaccinationById = async (req, res) => {
    try {
        const vaccination = await Vaccination.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Pet,
                where: {
                    userId: req.user.id
                }
            }]
        });

        if (!vaccination) {
            return res.status(404).json({
                message: "Aşı bulunamadı"
            });
        }

        res.status(200).json({
            success: true,
            data: vaccination
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Aşı bilgileri alınamadı"
        });
    }
};

exports.deleteVaccination = async (req, res) => {
    try {
        const vaccination = await Vaccination.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Pet,
                where: {
                    userId: req.user.id
                }
            }]
        });

        if (!vaccination) {
            return res.status(404).json({
                message: "Aşı bulunamadı"
            });
        }

        await vaccination.destroy();

        res.status(200).json({
            success: true,
            message: "Aşı silindi"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Aşı silinirken bir hata oluştu"
        });
    }
};