const { Router } = require('express')

// import routes
const users = require('./users/router')
const events = require('./events/router')
const donations = require('./donations/router')

// create a new Router instance
const allRouters = new Router()

// create base routes
allRouters.use('/users', users)
allRouters.use('/donations', donations)
allRouters.use('/events', events)
// allRouters.use('/events', events)
// allRouters.use('/donations', donations)

// exporting router
module.exports = allRouters
