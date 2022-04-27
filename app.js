const express = require("express");
const db = require("./src/config/db");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const userRouter = require("./src/routes/users");
const docRouter = express.Router();
const cookieParser = require("cookie-parser");

const http = require('http').Server(app);
const io = require("socket.io")(http);
let userList = [];

app.use(express.json());
app.use(cookieParser());

app.get("/api/ping", (req, res) => {
  res.send("API is up and running!");
});

app.get("/", (req, res)=>{
  res.sendFile(__dirname + '/template/index.html')
})

app.get("/chat", (req, res)=>{
  res.sendFile(__dirname + '/template/chat/chat.html')
})

docRouter.use("/swagger", swaggerUi.serve);
docRouter.get("/swagger", swaggerUi.setup(swaggerDocument));

app.use("/api/users", userRouter);
app.use("/docs", docRouter);

io.on('connection', (socket) => {
  socket.on('login', (userInfo) => {
    userList.push(userInfo);
    io.emit('userList', userList);
  })
  // Exit (built-in event)
  socket.on('disconnect', () => {
    userList = userList.filter(item => item.id != socket.id)
    io.emit('quit', socket.id)
  })
})

http.listen(port, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log(`Example app listening on port : http://127.0.0.1:${port}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    server.close();
  }
});



