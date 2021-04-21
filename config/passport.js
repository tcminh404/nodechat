const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');

module.exports = (passport, db) => {
  passport.use(
    new LocalStrategy((usernameField, passwordField, cb) => {
      db.query(
        "SELECT userid, username, password, type FROM users WHERE username=$1",
        [usernameField],
        (err, result) => {
          if (err) {
            //winston.error("Error when selecting user on login", err);
            return cb(err);
          }
          if (result.rows.length > 0) {
            const firstUser = result.rows[0];
            if (bcrypt.compare(passwordField, firstUser.password))
              cb(null, firstUser);
            else cb(null, false);
          } else {
            cb(null, false);
          }
        }
      );
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.userid);
  });

  passport.deserializeUser((id, cb) => {
    db.query(
      "SELECT userid, username, type FROM users WHERE userid = $1",
      [parseInt(id, 10)],
      (err, results) => {
        if (err) {
          console.log("Error when selecting user on session deserialize", err);
          return cb(err);
        }
        cb(null, results.rows[0]);
      }
    );
  });
};
