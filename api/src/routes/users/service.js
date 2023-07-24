const knex = require("../../knex.js");
const bcrypt = require("bcrypt");

exports.findAll = async () => {
  const results = await knex("users").select("*");

  return results;
};

