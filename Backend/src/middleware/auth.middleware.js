const foodParnetModel = require("../model/foodPartner.model");
const jwt = require('jsonwebtoken');
const userModel = require("../model/user.model");

async function authPartnerMiddleware(req,res ,next) {

    const {token} = req.cookies
    
    

    if(!token){
        res.status(401).json({
            message:"Please Login first"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JSON_TOKEN)
        const foodPartner = await foodParnetModel.findById(decoded.id)  

        req.foodPartner = foodPartner

        next()
        
    } catch (error) {
        return res.status(401).json({
            message:"Invalid Token"
        })
        
    }
    
}

async function authUserMiddleware(req,res,next) {
    const {token} = req.cookies
    

    if(!token){
        return res.status(401).json({
            message:"Please Login first"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JSON_TOKEN)
        const user = await userModel.findById(decoded.id)  

        

        req.user = user

        next()
        
    } catch (error) {
        return res.status(401).json({
            message:"Invalid Token"
        })
        
    }



    
}

module.exports = {authPartnerMiddleware , authUserMiddleware}