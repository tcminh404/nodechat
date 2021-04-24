const path = require("path");
const mockData = require("../../sample/data");
const logData = require("../../sample/log")

function getViewPath(file) {
    return path.join(__dirname, "../../views/" + file);
}

module.exports = {
    renderChat: (req, res) => {
        if(req.isAuthenticated()) {
            const sessionUser = req.session.passport.user;
            res.render(getViewPath("chat"), { user: sessionUser, roomList: mockData, logData: logData });
        }
        else res.redirect("/login");
    },

}