const express = require("express");
const db = require("./src/config/db");
const app = express();
const port = process.env.PORT || 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const userRouter = require("./src/routes/users");
const pingRouter = require("./src/routes/ping")
const docRouter = express.Router();
const cookieParser = require("cookie-parser");
const multer = require('multer');
const path = require('path');
const socket = require('socket.io');
const cors = require('cors');
const http = require('http').Server(app);
const io = require("socket.io")(http);
let userList = [];
const userModel = require('./src/data/userModel');
var bodyParser = require('body-parser');
const auth  = require('./src/middleware/authentication');

app.use(express.json());
app.use(cookieParser());
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// Index
app.get("/", new auth().authentication, (req, res)=>{
  res.sendFile(__dirname + '/template/index.html')
});

// Chat page
app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/template/chat/chat.html")
});

// DOC
docRouter.use("/swagger", swaggerUi.serve);
docRouter.get("/swagger", swaggerUi.setup(swaggerDocument));
app.use("/docs", docRouter);

// API
app.use("/api/users", userRouter);
app.use("/api/ping", pingRouter);

//STORAGE

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: async function(req, file, cb){
    await checkFileType(file, cb);
  }
}).single('myFile');

function checkFileType(file, cb){
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true);
  } else {
    return cb('Error: Images Only!', false);
  }
}

app.use(express.static('./public'));

app.post('/upload', async (req, res) => {
  await upload(req, res);
  res.send(200);
});

//SOCKET IO
io.on('connection', (socket) => {
  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });
  socket.on('disconnect', () => {
    userList = userList.filter(item => item.id != socket.id)
    io.emit('quit', socket.id)
  })
})

//START SERVER

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

