const pg = require("pg");
const dbConfig = require("../config/postgre");
const schema = require('./schema');

const pool = new pg.Pool(dbConfig.db);

pool.on("error", function (err) {
  console.log("idle client error", err.message, err.stack);
});

module.exports = {
  pool,
  query: (text, params, callback) => {
    //console.log(text,params,callback);
    return pool.query(text, params, callback);
  },

  createTable: () => {
    module.exports.query(schema.createUsers());
    module.exports.query(schema.createLog());
    module.exports.query(schema.createSession());
    module.exports.query(schema.createRoom());
  }
};
