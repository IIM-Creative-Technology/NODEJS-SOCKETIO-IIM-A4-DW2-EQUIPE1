const express = require("express");
const db = require("./src/config/db");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const userRouter = require("./src/routes/users");
const pingRouter = require("./src/routes/ping")
const docRouter = express.Router();
const cookieParser = require("cookie-parser");
const socket = require('socket.io');
const cors = require('cors');
const http = require('http').Server(app);
const io = require("socket.io")(http);
let userList = [];

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Index
app.get("/", (req, res)=>{
  res.sendFile(__dirname + '/template/index.html')
});
// Chat page
app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/template/chat/chat.html")
});

//Swagger
docRouter.use("/swagger", swaggerUi.serve);
docRouter.get("/swagger", swaggerUi.setup(swaggerDocument));
//Api
app.use("/api/ping", pingRouter);
app.use("/api/users", userRouter);
app.use("/docs", docRouter);

io.on('connection', (socket) => {
  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });
  // socket.on('login', (userInfo) => {
  //   userList.push(userInfo);
  //   io.emit('userList', userList);
  // })
  // Exit (built-in event)
  socket.on('disconnect', () => {
    userList = userList.filter(item => item.id != socket.id)
    io.emit('quit', socket.id)
  })
})

http.listen(port, async () => {
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


