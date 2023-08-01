const knex = require("../../knex.js");

exports.requestDonation = async (data) => {
  const results = await knex("pendingDonations").insert(data)
  return results;
};


