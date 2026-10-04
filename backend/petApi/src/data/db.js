const config = require("../config/conf");
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    {
        dialect:'mysql',
        host:config.db.host
    }
);
module.exports = sequelize;