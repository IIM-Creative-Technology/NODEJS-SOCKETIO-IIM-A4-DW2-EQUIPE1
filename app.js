const express = require("express");
const db = require('./src/config/db')
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(db.sequelize)
  console.log(`Example app listening on port ${port}`);
});
