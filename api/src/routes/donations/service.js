const knex = require("../../knex.js");

exports.findAll = async () => {
  const results = await knex("donations").select("*").innerJoin(
    'users', 
    'donations.userId', 
    '=', 
    'users.id'
  );
  return results;
};

exports.insertDonation = async (data) => {
  const results = await knex("donations").insert(data)
  return results;
};


