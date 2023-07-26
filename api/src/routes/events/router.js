const { Router } = require('express')
const multer = require("multer");
const path = require('path');
const crypto = require('crypto');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../../../../ui/public/images'))
        },
        filename: (req, file, cb) => {
            // randomBytes function will generate a random name
            let customFileName = crypto.randomBytes(18).toString('hex')
            // get file extension from original file name
            let fileExtension = path.extname(file.originalname).split('.')[1];
            cb(null, customFileName + '.' + fileExtension)
        }
      })
    })


const {showAll, addEvent, showEventsByNonprofitId} = require('./controller')

// create a new Router instance
const router = new Router()

// define routes

router.get('/', showAll)
router.get('/:id', showEventsByNonprofitId)
router.post('/new', upload.single("image"), addEvent)

// exporting router
module.exports = router

