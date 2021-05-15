const admin = require("../app/admin");
const render = require("../app/admin/render");
const chat = require("../app/chat")
const fs = require("fs-extra");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = (app, passport, db) => {
  // Render Admin feature
  app.get("/", render.renderLogin);
  app.get("/login", render.renderLogin);
  app.get("/register", render.renderRegister);
  app.get("/chat", chat.renderChat);
  app.get("/manager", (req, res) => {
    if (req.user.type==='admin'){
      render.renderAdmin(req,res);
    }else{
      render.renderManager(req,res);
    }
  });

  app.get("/api/log/:roomid", admin.fetchDataLog);
  app.post("/api/room",admin.createRoom);
  app.post("/api/join",admin.joinRoom);
  app.post("/api/deleteRoom",admin.deleteRoom);
  app.post("/api/deleteUser",admin.deleteUser);

  // Login
  app.post(
    "/api/login",
    passport.authenticate("local", {
      successRedirect: "/chat",
      failureRedirect: "/login",
    })
  );

  // Logout
  app.post("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Register
  app.post("/api/register", async (req, res) => {
    let role = "user";
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    db.query(
      "INSERT INTO users(username,password,type) VALUES($1,$2,$3)",
      [req.body.username, hash, role],
      (err, results) => {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/chat");
        }
      }
    );
  });

};
