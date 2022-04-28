const db = require("../../config/db");
const { DataTypes } = require('sequelize');

const SimpleTest = db.sequelize.define('SimpleTest', {
  // Model attributes are defined here
  someText: {
    type: DataTypes.STRING
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(SimpleTest === db.sequelize.models.SimpleTest); // true

module.exports = SimpleTest;