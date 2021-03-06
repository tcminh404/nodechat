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

  fetchDataRoom: async (userid = 0) => {
    const queryRoomId = {
      action: "SELECT * FROM",
      table: "member",
      condition: "WHERE userid = $1",
      params: [userid]
    };
    var roomId = await apiLogic.fetchData(queryRoomId);
    roomId = roomId.map(element => element.roomid);
    const query = {
      action: "SELECT * FROM",
      table: "room",
      condition: `WHERE userid = ${userid} OR roomid = ANY(ARRAY[0${roomId}]) OR roomtype = 'public'`
    };
    const data = await apiLogic.fetchData(query);
    return data;
  },

  fetchRoomOwner: async (userid = 0) => {
    const queryRoomId = {
      action: "SELECT * FROM",
      table: "member",
      condition: "WHERE userid = $1",
      params: [userid]
    };
    var roomId = await apiLogic.fetchData(queryRoomId);
    roomId = roomId.map(element => element.roomid);
    const query = {
      action: "SELECT * FROM",
      table: "room",
      condition: `WHERE userid = ${userid}`
    };
    const data = await apiLogic.fetchData(query);
    return data;
  },

  fetchDataLog: async (req, res) => {
    const roomid = parseInt(req.params.roomid);

    const query = {
      action: "SELECT * FROM",
      table: "log",
      condition: "WHERE roomid = $1",
      params: [roomid]
    };
    const data = await apiLogic.fetchData(query);
    res.send(data);
  },

  createRoom: async (req, res) => {
    var pass = crypto.randomBytes(30).toString('hex');
    const query = {
      action: "INSERT INTO",
      table: "room",
      condition: `(roomname, roompassword, roomtype, userid) VALUES ($1,$2,$3,$4)`,
      params: [req.body.roomname, pass, req.body.roomtype, req.user.userid],
    }
    apiLogic.updateData(query);
    res.send("");
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
      params: [data[0].roomid, req.user.userid],
    }
    apiLogic.updateData(query1);
    res.send("");
  },

  deleteRoom: async (req, res) => {
    var condition;
    if (req.user.type === 'admin') {
      condition = `WHERE roomid = ${req.body.roomid}`
    } else {
      condition = `WHERE roomid = ${req.body.roomid} AND userid = ${req.user.userid}`
    }
    const query1 = {
      action: "DELETE FROM",
      table: "room",
      condition: condition,
    }
    apiLogic.updateData(query1);
    res.redirect("/manager");
  },

  deleteUser: async (req, res) => {
    if (req.user.userid != req.body.userid) {
      const query1 = {
        action: "DELETE FROM",
        table: "users",
        condition: `WHERE userid = ${req.body.userid}`,
      }
      apiLogic.updateData(query1);
    }
    res.redirect("/manager");
  },
}