const { DataTypes } = require('sequelize');
const sequelize = require('../data/db')

const Pet = sequelize.define("Pet", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING, // kedi, köpek
        allowNull: false,
    },
    breed: {
        type: DataTypes.STRING, // cins
    },
    tagNo: {
        type: DataTypes.STRING, // küpe/tasma no
    },
    birthDate: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Pet;