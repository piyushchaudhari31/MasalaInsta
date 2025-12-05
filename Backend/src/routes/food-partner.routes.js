const express =require('express')
const { authUserMiddleware } = require('../middleware/auth.middleware')
const { getFoodPartnerVideo } = require('../controllers/foodpartner.controller')

const router = express.Router()

router.get('/:id',authUserMiddleware,getFoodPartnerVideo)


module.exports = router