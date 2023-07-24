/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const events = require('./data/events.json')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('events').del()
  await knex('events').insert(events);
};
