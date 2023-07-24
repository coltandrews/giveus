const knex = require("../../knex.js");
const bcrypt = require("bcrypt");

exports.findAll = async () => {
  const results = await knex("users").select("*");

  return results;
};

exports.createUser = async (userData) => {
  const { username, password } = userData;

  // Hash the password with 10 rounds of salt
  const hash = await bcrypt.hash(password, 10);

  // delete plaintext password
  delete userData.password;

  // Insert the user into the database and return
  return await knex("users")
    .insert({
      ...userData,
      username: username,
      password: hash, //store the hash. DO NOT store a plaintext password!
    })
    .returning(["id", "username", "role"]); // return the data you need excluding the password
};

