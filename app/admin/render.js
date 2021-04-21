const path = require("path");

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
}