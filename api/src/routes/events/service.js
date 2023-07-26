const knex = require("../../knex.js");

exports.findAll = async () => {
  const results = await knex("events").select("*").innerJoin(
    'users', 
    'events.userId', 
    '=', 
    'users.id'
  );
  return results;
};

exports.findEventByNonprofitId = async (id) => {
  const results = await knex("events").select("*").where('userId', id).innerJoin(
    'users', 
    'events.userId', 
    '=', 
    'users.id'
  );
  return results;
};

exports.insertEvent = async (data) => {
  const results = await knex("events").insert(data)
  return results;
};


