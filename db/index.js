const pg = require("pg");
const dbConfig = require("../config/postgre");

const pool = new pg.Pool(dbConfig.db);

pool.on("error", function (err) {
  console.log("idle client error", err.message, err.stack);
});

module.exports = {
  pool,
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
