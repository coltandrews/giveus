/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates users table
exports.up = function(knex) {
  return knex.schema.createTable('donations', function(table) {
    table.increments('id').primary();
    table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('eventId').nullable().references('id').inTable('events').onDelete('CASCADE');
    table.string('itemName', 50).notNullable();
    table.string('value').nullable();
    table.string('itemDescription', 255).nullable();
    table.string('itemImage', 255).nullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// drops users table
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('donations')
};
