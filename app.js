const express = require("express");
const db = require("./src/config/db");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const userRouter = require("./src/routes/users");
const docRouter = express.Router();
const cookieParser = require("cookie-parser");
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/api/ping", (req, res) => {
  res.send("API is up and running!");
});
app.get("/", (req, res)=>{
res.sendFile(__dirname + '/template/index.html')
})
docRouter.use("/swagger", swaggerUi.serve);
docRouter.get("/swagger", swaggerUi.setup(swaggerDocument));

app.use("/api/users", userRouter);
app.use("/docs", docRouter);

const server = app.listen(port, async () => {
  try {
    await db.sequelize.authenticate();
    await db.migrate();
    console.log("Connection has been established successfully.");
    console.log(`Example app listening on port : http://127.0.0.1:${port}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    server.close();
  }
});

