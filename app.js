const express = require("express");
const db = require("./src/config/db");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const userRouter = require("./src/routes/users");
const docRouter = express.Router();

app.use(express.json());

app.get("/api/ping", (req, res) => {
  res.send("API is up and running!");
});

docRouter.use("/swagger", swaggerUi.serve);
docRouter.get("/swagger", swaggerUi.setup(swaggerDocument));

app.use("/api/users", userRouter);
app.use("/docs", docRouter);

const server = app.listen(port, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log(`Example app listening on port ${port}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    server.close();
  }
});
