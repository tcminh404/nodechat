const express = require("express");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");

const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

require('dotenv-flow').config();

const PORT = process.env.PORT || 9000;
const db = require("./db");
app.set("view engine", "ejs");

app.use(cors());
app.use(bodyParser.json({ limit: "4mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const session = require("express-session");
const apiLogic = require("./app/admin/apiLogic");
const pgSession = require("connect-pg-simple")(session);
const sessionMiddleware = session({
  secret: "nyan cat",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 6000000 },
  store: new pgSession({
    pool: db.pool,
    tableName: "session",
  }),
})
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.use("/vendor", express.static("vendor"));

//Routing
require("./config/route")(app, passport, db);
require("./config/passport")(passport, db);

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
})

io.on('connection', async (socket) => {
  const query = {
    action: "SELECT roomid FROM",
    table: "room",
    condition: ``
  };
  roomList = await apiLogic.fetchData(query)
  //console.log(roomList)
  roomList.map(mapData => {
    socket.on(`chat message [${mapData.roomid}]`, (user, msg) => {
      let logQuery = {
        action: "INSERT INTO",
        table: "log",
        condition: `(message, username, roomid, date) VALUES ($1, $2, $3, NOW())`,
        params: [msg, user.user, user.roomid],
      };

      apiLogic.updateData(logQuery)
      io.emit(`chat message [${mapData.roomid}]`, user.user, msg);
    });
  })
  
});

server.listen(PORT, (req, res) => {
  console.log(`http://localhost:${PORT}`);
  db.createTable();
});