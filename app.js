const express = require("express");
const db = require("./src/config/db");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const userRouter = require("./src/routes/users");
const docRouter = express.Router();
const cookieParser = require("cookie-parser");
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const userModel = require('./src/data/userModel');
const path = require('path');
var bodyParser = require('body-parser');
const auth  = require('./src/middleware/authentication');

app.use(express.json());
app.use(cookieParser());
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.get("/api/ping", async (req, res) => {
  const users = await userModel.findAll();
  res.send(users);
});
app.get("/", new auth().authentication, (req, res) => {
  res.sendFile(__dirname + '/template/index.html')
});

docRouter.use("/swagger", swaggerUi.serve);
docRouter.get("/swagger", swaggerUi.setup(swaggerDocument));

app.use("/api/users", userRouter);
app.use("/docs", docRouter);

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myFile');

function checkFileType(file, cb){
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

app.use(express.static('./public'));

app.post('/upload', (req, res) => {
  upload(req, res)
});

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

