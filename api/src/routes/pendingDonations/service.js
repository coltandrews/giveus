const knex = require("../../knex.js");

exports.requestDonation = async (data) => {
  const results = await knex("pendingdonations").insert(data)
  return results;
};

exports.findAllById = async () => {
  const results = await knex
    .select("pd.*", "u.*", "pd.id as pendingdonations.id")
    .from({ pd: "pendingdonations" })
    .innerJoin({ u: "users" }, "pd.auctioneerId", "=", "u.id");
  return results;
};

