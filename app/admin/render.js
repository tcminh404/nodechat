const path = require("path");
const admin = require("../admin");

function getViewPath(file) {
    return path.join(__dirname, "../../views/" + file);
}

module.exports = {
    renderLogin: (req, res) => {
        res.render(getViewPath("login"));
    },

    renderRegister: (req, res) => {
        res.render(getViewPath("register"));
    },

    renderManager: async (req, res) => {
        if (req.isAuthenticated()) {
            const sessionUser = req.session.passport.user;
            const roomId = req.body.roomid;
            var mockData = await admin.fetchRoomOwner(sessionUser.userid);
            //var logData = await admin.fetchDataLog(roomId);
            res.render(getViewPath("manager"), { user: sessionUser, roomList: mockData });
        }
        else res.redirect("/login");
    },

    renderAdmin: async (req, res) => {
        if (req.isAuthenticated()) {
            const sessionUser = req.session.passport.user;
            var mockData = await admin.fetchDataTable("room");
            var userData = await admin.fetchDataTable("users");
            res.render(getViewPath("admin"), { user: sessionUser, roomList: mockData, userList: userData });
        }
        else res.redirect("/login");
    },
}