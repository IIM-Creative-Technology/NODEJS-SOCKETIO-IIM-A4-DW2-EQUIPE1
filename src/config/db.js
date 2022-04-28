const { Sequelize } = require('sequelize');

if (process.env.NODE_ENV === 'DEV') {
    const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
        host: process.env.PGHOST,
        dialect: 'postgres',
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    });
} else {
    const sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    });
}

const migrate = async () => {
    try {
        await sequelize.sync();
    } catch (error) {
        console.log(`DB migration : ${error}`)
    }
}

module.exports = { sequelize, migrate };