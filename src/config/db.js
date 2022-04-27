const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    dialect: 'postgres',
    ssl: {
        require: true,
        rejectUnauthorized: false
    }

});

module.exports = { sequelize };