require("dotenv").config();

const jwt = require("jsonwebtoken");

const { findAll, insertEvent, findEventByNonprofitId } = require("./service");

exports.showAll = async (req, res) => {
  try {
    const getAllEvents = await findAll();
    return res.json(getAllEvents);
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
};

exports.showEventsByNonprofitId = async (req, res) => {
  try {
    const getEventsData = await findEventByNonprofitId(req.params.id);
    return res.json(getEventsData);
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
};

exports.addEvent = async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file upladed" });
    }

    // get the file that was uploaded - the .file property is there because we added it to
    // FormData when we posted from client (see FileUpload.js)

    const data = {
      "userId": req.body.userId,
      "eventName": req.body.itemName,
      "eventImage": req.file.filename,
      "eventDescription": req.body.eventDescription,
      "eventDate": req.body.eventDate
    }
    console.log(req.file)
    const response = await insertEvent(data)

    // remove spaces (there may be some other characters that are invalid for url filenames...)

  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
};
