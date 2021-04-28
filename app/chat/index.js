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
            var data = [];
            var log = [];
            var mockData = await admin.fetchDataTable("room");
            var logData = await admin.fetchDataTable("log");
            mockData.forEach(element => {data.push(element)});
            logData.forEach(element => {log.push(element)});
            res.render(getViewPath("chat"), { user: sessionUser, roomList: data, logData: log });
        }
        else res.redirect("/login");
    },

}