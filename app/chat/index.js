const path = require("path");
//const mockData = require("../../sample/data");
//const logData = require("../../sample/log")
const admin = require("../admin");

function getViewPath(file) {
    return path.join(__dirname, "../../views/" + file);
}

module.exports = {
    renderChat: async (req, res) => {
        if(req.isAuthenticated()) {
            const sessionUser = req.session.passport.user;
            const roomId = req.body.roomid;
            var mockData = await admin.fetchDataRoom(sessionUser.userid);
            var logData = await admin.fetchDataLog(roomId);
            res.render(getViewPath("chat"), { user: sessionUser, roomList: mockData, logData: logData });
        }
        else res.redirect("/login");
    },

}