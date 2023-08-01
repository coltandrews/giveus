const { Router } = require('express')

const {showAll, requestDonationForEvent} = require('./controller')

// create a new Router instance
const router = new Router()

// define routes

router.get('/', showAll)
router.post('/request/', requestDonationForEvent)

// exporting router
module.exports = router

