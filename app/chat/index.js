const path = require("path");

function getViewPath(file) {
    return path.join(__dirname, "../../views/" + file);
}

module.exports = {
    renderChat: (req, res) => {
        const sessionUser = req.session.passport.user
        if(req.isAuthenticated())
            res.render(getViewPath("chat"), { user: sessionUser});
        else res.redirect("/login");
    },

}