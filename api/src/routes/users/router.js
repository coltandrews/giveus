const { Router } = require('express')

const {showAll, register, login, showMe, showById, showAllNonprofits} = require('./controller')


//import middleware
const { authenticate } = require('../../middleware/auth')

// create a new Router instance
const router = new Router()

// define routes

router.get('/', authenticate, showAll)
router.get('/nonprofits', showAllNonprofits)
router.get('/me', authenticate, showMe)
router.get('/id/:id', showById)
router.post('/register', register)
router.post('/login', login)

// exporting router
module.exports = router

