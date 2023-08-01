const knex = require("../../knex.js");
const to_knex = require("postgresql-to-knex");

exports.findAll = async () => {
  const results = await knex
    .select("d.*", "u.*", "d.id as donationId")
    .from({ d: "donations" })
    .innerJoin({ u: "users" }, "d.userId", "=", "u.id");
  return results;
};

exports.findMyDonations = async (id) => {
  //console.log(to_knex("SELECT donations.id, donations.itemName, donations.itemDescription, donations.createdAt, COUNT(pendingdonations.id) as requestCount FROM donations LEFT JOIN pendingdonations ON donations.id = pendingdonations.donationid GROUP BY donations.id;"))
  const results = await knex
    .select(
      `donations.id`,
      `donations.itemName`,
      `donations.itemDescription`,
      `donations.createdAt`,
      knex.raw(`count(pendingdonations.id) AS requestcount`)
    )
    .from(`donations`)
    .leftOuterJoin(`pendingdonations`, function () {
      this.on("donations.id", "=", "pendingdonations.donationId");
    })
    .where('userId',id).groupByRaw(`donations.id`);
  return results;
};

exports.insertDonation = async (data) => {
  const results = await knex("donations").insert(data);
  return results;
};

exports.deleteDonation = async (id) => {
  const deletedEvent = await knex("donations").delete().where("id", id);
  return deletedEvent;
};

exports.acceptDonationRequest = async (id, data) => {
  const results = await knex("donations").update(data).where('id',id);
  await knex('pendingdonations').delete().where("donationId",id)
  return results;
};