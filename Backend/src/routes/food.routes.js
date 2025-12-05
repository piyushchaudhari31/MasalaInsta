const express = require('express')
const { authPartnerMiddleware, authUserMiddleware } = require('../middleware/auth.middleware')
const { createFood, getFoodItem, getFoodPartnerVideo, likeFood, saveFood, getsavefood } = require('../controllers/food.controller')
const multer = require('multer')

const router = express.Router()
const upload = multer({
    storage: multer.memoryStorage()
})

router.post('/',authPartnerMiddleware,upload.single("video"),createFood)

router.get('/',authUserMiddleware,getFoodItem)

router.post('/like',authUserMiddleware ,likeFood)

router.post('/save',authUserMiddleware,saveFood)

router.get('/save',authUserMiddleware , getsavefood)

module.exports = router