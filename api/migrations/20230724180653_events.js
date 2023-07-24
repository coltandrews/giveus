/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates users table
exports.up = function(knex) {
  return knex.schema.createTable('events', function(table) {
    table.increments('id').primary();
    table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('eventName', 50).notNullable();
    table.dateTime('eventDate').nullable();
    table.string('description', 255).nullable();
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
  return knex.schema.dropTableIfExists('events')
};
