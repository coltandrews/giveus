const { Router } = require('express')

const {showAll, requestDonationForEvent, showAllById} = require('./controller')

// create a new Router instance
const router = new Router()

// define routes

router.get('/', showAll)
router.get('/:id', showAllById)
router.post('/request/', requestDonationForEvent)

// exporting router
module.exports = router

