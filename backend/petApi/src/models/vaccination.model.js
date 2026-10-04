const sequelize = require('../data/db');
const { DataTypes } = require('sequelize');

const Vaccination = sequelize.define("Vaccination", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE, // yapılan tarih
        allowNull: false,
    },
    nextDate: {
        type: DataTypes.DATE,
    },
    note: {
        type: DataTypes.STRING,
    },
    petId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Vaccination;

//aşı hatırlatma sistemi ekle