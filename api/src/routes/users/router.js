const { Router } = require('express')

const {showAll, register} = require('./controller')


//import middleware
const { authenticate } = require('../../middleware/auth')

// create a new Router instance
const router = new Router()

// define routes

router.get('/', authenticate, showAll)
router.post('/register', register)

// exporting router
module.exports = router

