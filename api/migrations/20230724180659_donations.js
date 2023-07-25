/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates users table
exports.up = function(knex) {
  return knex.schema.createTable('donations', function(table) {
    table.increments('id').primary();
    table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('eventId').notNullable().references('id').inTable('events').onDelete('CASCADE');
    table.string('itemName', 50).notNullable();
    table.decimal('value',14,2).nullable();
    table.string('itemDescription', 255).nullable();
    table.string('image', 255).nullable();
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
