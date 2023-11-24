const express = require('express')
const router = express.Router()

const { login, dashboard } = require('../controllers/main')

// const authMiddleware = require('../middleware/auth')

// router.route('/dashboard').get( dashboard)
router.route('/login').post(login)
// router.route('/adminPage').get(dashboard)

module.exports = router
