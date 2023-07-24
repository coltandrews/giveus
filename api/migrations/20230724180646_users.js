/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates users table
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('username', 50).unique().notNullable();
    table.string('organizationName', 255).nullable()
    table.string('ein', 30).nullable()
    table.string('email', 150).unique().notNullable();
    table.string('password', 72).notNullable();
    table.string('firstname', 50).nullable();
    table.string('lastname', 50).nullable()
    table.string('address', 255).nullable()
    table.string('phoneNumber', 20).notNullable();
    table.text('description')
    table.string('image', 255)
    table.enu("role", ["admin", "auctioneer","donor"]).notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// drops users table
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
