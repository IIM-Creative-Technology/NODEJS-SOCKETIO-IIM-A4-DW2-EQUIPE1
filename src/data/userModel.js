const db = require("../config/db");
const { DataTypes } = require('sequelize');

const User = db.sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === db.sequelize.models.User); // true

module.exports = User;