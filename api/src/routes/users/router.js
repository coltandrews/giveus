const { Router } = require('express')
const {showAll, showMe} = require('./controller')

//import middleware
const { authenticate } = require('../../middleware/auth')

// create a new Router instance
const router = new Router()

// define routes

router.get('/', authenticate, showAll)



// exporting router
module.exports = router

