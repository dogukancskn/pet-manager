const User = require("./user.model");
const Pet = require("./pet.model");
const Vaccination = require("./vaccination.model");

User.hasMany(Pet, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

Pet.belongsTo(User, {
    foreignKey: "userId"
});

Pet.hasMany(Vaccination, {
    foreignKey: "petId"
});

Vaccination.belongsTo(Pet, {
    foreignKey: "petId"
});

module.exports = {
    User,
    Pet,
    Vaccination
};