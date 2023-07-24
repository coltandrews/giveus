require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {  findAll, createUser } = require('./service')

exports.showAll = async (req, res) => {
  try {

    // Only allow admins to access the user list
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You do not have permission to access this resource' })
    }

    const allUsers = await findAll()
    return res.json(allUsers)
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
};

exports.register = async (req, res) => {
  try {
    const userData = req.body;
    const user = await createUser(userData);

    // Create a JWT and send it back to the client
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    return res.json({ token });
  } catch (error) {
    console.log(error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Account already exists" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};