require("dotenv").config();

const jwt = require("jsonwebtoken");

const { findAll, insertDonation } = require("./service");

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
      "userId": req.body.userId,
      "itemName": req.body.itemName,
      "itemImage": req.file.filename,
      "itemDescription": req.body.itemDescription,
      "value": req.body.value
    }
    console.log(req.file)
    const response = await insertDonation(data)

    // remove spaces (there may be some other characters that are invalid for url filenames...)

  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
};
