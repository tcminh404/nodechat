const path = require("path");
const apiLogic = require("./apiLogic");
const crypto = require("crypto");

module.exports = {
  fetchDataTable: async (table) => {
    const query = {
      action: "SELECT * FROM",
      table: table,
    };
    const data = await apiLogic.fetchData(query);
    return data;
  },
  
  createRoom: async (req, res) => {
    var pass = crypto.randomBytes(30).toString('hex');
    const query = {
      action: "INSERT INTO",
      table: "room",
      condition: `(roomname, roompassword, roomtype, userid) VALUES ($1,$2,$3,$4)`,
      params: [req.body.roomname,pass,req.body.roomtype,req.user.userid],
    }
    apiLogic.updateData(query);
  },

  joinRoom: async (req, res) => {
    var secret = req.body.secret;
    const query = {
      action: "SELECT roomid FROM",
      table: "room",
      condition: `WHERE roompassword = $1`,
      params: [secret]
    };
    const data = await apiLogic.fetchData(query);
    const query1 = {
      action: "INSERT INTO",
      table: "member",
      condition: `(roomid, userid) VALUES ($1,$2)`,
      params: [data[0].roomid,req.user.userid],
    }
    apiLogic.updateData(query1);
  },
}