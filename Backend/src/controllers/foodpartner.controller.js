const foodParnetModel = require("../model/foodPartner.model")

const foodModel = require("../model/food.model")

async function getFoodPartnerVideo(req,res){

    const {id} = req.params
    const foodpartner = await foodParnetModel.findById(id)
    const foodItems = await foodModel.find({foodPartner:id})

    if(!foodpartner){
        res.status(400).json({
            message:"Something Went Wrong"
        })
    }


    res.status(200).json({
        message:"Fatch Successfully",
        foodpartner,
        foodItems
    })
}

module.exports ={getFoodPartnerVideo}