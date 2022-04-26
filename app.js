const express = require("express");
const db = require('./src/config/db')
const app = express();
const port = 3000;

app.listen(port, async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:',error);
  }
  console.log(`Example app listening on port ${port}`);
});
