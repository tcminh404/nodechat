const path = require("path");
const mockData = require("../../sample/data");

function getViewPath(file) {
    return path.join(__dirname, "../../views/" + file);
}

module.exports = {
    renderChat: (req, res) => {
        const sessionUser = req.session.passport.user
        console.log(mockData)
        if(req.isAuthenticated())
            res.render(getViewPath("chat"), { user: sessionUser, roomList: mockData});
        else res.redirect("/login");
    },

}