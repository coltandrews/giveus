const { Router } = require('express')

const {showAll} = require('./controller')


//import middleware
const { authenticate } = require('../../middleware/auth')

// create a new Router instance
const router = new Router()

// define routes

router.get('/', showAll)


// exporting router
module.exports = router

