const {
  renderLogin,
  renderRegister,
} = require("../app/admin");

const { renderChat } = require("../app/chat")
const fs = require("fs-extra");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = (app, passport, db) => {
  // Render Admin feature
  app.get("/", renderLogin);
  app.get("/login", renderLogin);
  app.get("/register", renderRegister);
  app.get("/chat", renderChat);

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
    if (true /*req.isAuthenticated()*/)
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
    else (res.send("Require login!"));
  });

};
