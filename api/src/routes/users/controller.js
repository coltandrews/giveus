require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  findById,
  findAll,
  createUser,
  findByUsername,
  destroyUser,
  modifyUser,
} = require("./service");

exports.showAll = async (req, res) => {
  try {
    // Only allow admins to access the user list
    if (!req.user || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You do not have permission to access this resource" });
    }

    const allUsers = await findAll();
    return res.json(allUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
};
