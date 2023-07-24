const { Router } = require('express')

const {showAll, register, login} = require('./controller')


//import middleware
const { authenticate } = require('../../middleware/auth')

// create a new Router instance
const router = new Router()

// define routes

router.get('/', authenticate, showAll)
router.post('/register', register)
router.post('/login', login)

// exporting router
module.exports = router

