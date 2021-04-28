const path = require("path");
const apiLogic = require("./apiLogic");

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

    fetchDataTable: async (table) => {
        const query = {
          action: "SELECT * FROM",
          table: table,
        };
        const data = await apiLogic.fetchData(query);
        return data;
    },
}