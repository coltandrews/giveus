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
exports.findEventById = async (id) => {
  const results = await knex("events").select("*").where('events.id', id).innerJoin(
    'users', 
    'events.userId', 
    '=', 
    'users.id'
  );
  return results;
};
exports.findMyEvents = async (id) => {
  const results = await knex("events").select("*").where('userId', id);
  return results;
};

exports.insertEvent = async (data) => {
  const results = await knex("events").insert(data)
  return results;
};

exports.deleteEvent = async (id) => {
  const deletedEvent = await knex("events").delete().where("id", id);
  return deletedEvent;
};

exports.modifyEvent = async (data, id) => {
  return await knex('events').update(data).where('id', id) // return the data you need excluding the password
}

