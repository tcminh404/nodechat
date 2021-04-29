const path = require("path");
const apiLogic = require("./apiLogic");

module.exports = {
    fetchDataTable: async (table) => {
        const query = {
          action: "SELECT * FROM",
          table: table,
        };
        const data = await apiLogic.fetchData(query);
        return data;
    },
}