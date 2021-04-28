const path = require("path");
const db = require("../../db");
const fs = require("fs");

module.exports = {
  fetchData: async (query) => {
    const queryResult = await db.query(`${query.action} ${query.table}`);
    return queryResult.rows;
  },

  updateData: async (query) => {
    const queryResult = await db.query(
      `${query.action} ${query.table} ${query.condition};`,
      query.params
    );
  },
};
