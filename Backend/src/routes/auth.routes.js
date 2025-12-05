const express = require('express')
const { userRegister ,userLogin, userLogOut, registerFoodPartner, loginFoodPartner, FoodPartnerLogOut, getData } = require('../controllers/auth.controller')
const { authUserMiddleware } = require('../middleware/auth.middleware')


const router = express.Router()

// user Auth API //
router.post('/user/register',userRegister)
router.post('/user/login',userLogin)
router.post('/user/log-out',userLogOut)

router.get('/getData',getData)


//Food-partner
router.post('/food-partner/register',registerFoodPartner)
router.post('/food-partner/login',loginFoodPartner)
router.post('/food-partner/log-out',FoodPartnerLogOut)



module.exports = router