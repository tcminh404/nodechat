const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');

module.exports = (passport, db) => {
  passport.use(
    new LocalStrategy((usernameField, passwordField, cb) => {
      db.query(
        "SELECT userId, username, password, type FROM users WHERE username=$1",
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
    done(null, { userid: user.userId, username: user.username });
  });

  passport.deserializeUser((user, cb) => {
    db.query(
      "SELECT userId, username, type FROM users WHERE userId = $1",
      [parseInt(user.userid, 10)],
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
