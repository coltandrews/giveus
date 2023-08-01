const knex = require("../../knex.js");

exports.findAllOld = async () => {
  const results = await knex("donations").select("*").innerJoin(
    'users', 
    'donations.userId', 
    '=', 
    'users.id'
  );
  return results;
};

exports.findAll = async () => {
  const results = await knex.select("d.*","u.*","d.id as donationId")
  .from({d: "donations"})
  .innerJoin(
    {u: "users"},
    "d.userId",
    "=",
    "u.id"
  );
  return results;
};

exports.findMyDonations = async (id) => {
  const results = await knex("donations").select("*").where('userId', id)
  return results;
};


exports.insertDonation = async (data) => {
  const results = await knex("donations").insert(data)
  return results;
};

exports.deleteDonation = async (id) => {
  const deletedEvent = await knex("donations").delete().where("id", id);
  return deletedEvent;
};



