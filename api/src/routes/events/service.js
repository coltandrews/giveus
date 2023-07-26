const knex = require("../../knex.js");

exports.findAll = async () => {
  const results = await knex("events").select("*").innerJoin(
    'users', 
    'donations.userId', 
    '=', 
    'users.id'
  );
  return results;
};

exports.insertEvent = async (data) => {
  const results = await knex("events").insert(data)
  return results;
};


