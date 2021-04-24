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
const pgSession = require("connect-pg-simple")(session);
const sessionMiddleware = session({
  secret: "nyan cat",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 },
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

io.on('connection', (socket) => {
  console.log(socket.request.session)
  console.log('a user connected');
});


server.listen(PORT, (req, res) => {
  console.log(`http://localhost:${PORT}`);
});