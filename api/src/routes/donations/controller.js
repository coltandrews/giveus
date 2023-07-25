require("dotenv").config();

const jwt = require("jsonwebtoken");

const {findAll} = require('./service')

exports.showAll = async (req, res) => {
  try {
    const getAllDonations = await findAll();
    return res.json(getAllDonations);

  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
};