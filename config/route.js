const {
  renderLogin,
  renderRegister,
} = require("../app/admin");
const fs = require("fs-extra");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = (app, passport, db) => {
  // Render Admin feature
  app.get("/login", renderLogin);
  app.get("/register", renderRegister);

  // Login
  app.post(
    "/api/login",
    passport.authenticate("local", {
      successRedirect: "/panel",
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
    let role = "admin";
    const hash = bcrypt.hash(req.body.password, saltRounds);
    if (true /*req.isAuthenticated()*/)
      db.query(
        "INSERT INTO admin(username,password,type) VALUES($1,$2,$3)",
        [req.body.username, hash, role],
        (err, results) => {
          if (err) {
            res.send(err);
          } else {
            res.redirect("/panel");
          }
        }
      );
    else (res.send("Require login!"));
  });

};
