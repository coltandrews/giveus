/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const donations = require('./data/donations.json')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('donations').del()
  await knex('donations').insert(donations);
};
