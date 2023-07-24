/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const auctioneers = require('./data/auctioneers.json')
const donors = require('./data/donors.json')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(auctioneers);
  await knex('users').insert(donors);
};
