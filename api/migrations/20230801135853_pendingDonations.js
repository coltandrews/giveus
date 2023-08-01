/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('pendingDonations', function(table) {
    table.increments('id').primary();
    table.integer('donorId').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('auctioneerId').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('donationId').notNullable().references('id').inTable('donations').onDelete('CASCADE');
    table.integer('pendingEventId').nullable().references('id').inTable('events').onDelete('CASCADE');
    table.string('itemName', 50).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pendingDonations')
};
