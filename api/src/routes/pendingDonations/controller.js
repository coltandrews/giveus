require("dotenv").config();

const jwt = require("jsonwebtoken");

const { findAll, findAllById, requestDonation } = require("./service");

exports.showAll = async (req, res) => {
  try {
    const getAllDonations = await findAll();
    return res.json(getAllDonations);
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
};

exports.showAllById = async (req, res) => {
  try {
    const getAllDonations = await findAllById(req.params.id);
    return res.json(getAllDonations);
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
};
exports.requestDonationForEvent = async (req, res) => {
  try {
    const response = await requestDonation(req.body);
    // remove spaces (there may be some other characters that are invalid for url filenames...)
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
};
