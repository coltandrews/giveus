require("dotenv").config();

const jwt = require("jsonwebtoken");

const { findAll, insertDonation, findMyDonations, deleteDonation, acceptDonationRequest } = require("./service");

exports.showAll = async (req, res) => {
  try {
    const getAllDonations = await findAll();
    return res.json(getAllDonations);
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
};
exports.addDonation = async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file upladed" });
    }

    // get the file that was uploaded - the .file property is there because we added it to
    // FormData when we posted from client (see FileUpload.js)
    const data = {
      userId: req.body.userId,
      itemName: req.body.itemName,
      itemImage: req.file.filename,
      itemDescription: req.body.itemDescription,
      value: Number(req.body.value),
    };
    const response = await insertDonation(data);
    // remove spaces (there may be some other characters that are invalid for url filenames...)
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
};
exports.acceptDonationRequestById = async (req, res) => {
  const donationId = req.params.id
  const donationRequest = req.body
  console.log(donationRequest)
  try {
    const response = await acceptDonationRequest(donationId, donationRequest);
    // remove spaces (there may be some other characters that are invalid for url filenames...)
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
};
exports.showDonationsById = async (req, res) => {
  try {
    const getDonationsData = await findMyDonations(req.params.id);
    return res.json(getDonationsData);
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
};
exports.destroyDonation = async (req, res) => {
  try {
    const deletedEvent = await deleteDonation(req.params.id)
    return res.json(deletedEvent)

  } catch (error) {
    console.log(error)
    return res.status(500).json()
  }
}