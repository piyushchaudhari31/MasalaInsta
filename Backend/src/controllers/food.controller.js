const foodModel = require("../model/food.model");
const likeModel = require('../model/likes.model')
const saveModel = require('../model/save.model')
const uploadfile = require("../services/imagekit.service");
const {v4:uuid} = require('uuid')
async function createFood(req,res){

    try {
        
    const {name , description} = req.body
    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }
    
    

    const uploadFileResult = await uploadfile(req.file.buffer , uuid())
    
    const foodItem = await foodModel.create({
        name,
        description,
        video:uploadFileResult.url,
        foodPartner:req.foodPartner._id,
        
    })

    res.status(201).json({
        message:"Food Created Successfully",
        food:foodItem
    })
        
    } catch (error) {
        console.log(error.message);
        
        
    }
    
}

async function getFoodItem(req,res) {

    const foodItem = await foodModel.find({})
    res.status(200).json({
        message:"Food Item Fatch Sucessfully",
        foodItem
    })
    
}

async function likeFood(req,res){
    const {foodId} = req.body

    const user = req.user

    const isAlreadyLike = await likeModel.findOne({
        user:user._id,
        food:foodId
    })

    if(isAlreadyLike){
        await likeModel.deleteOne({user:user._id , food:foodId})

        await foodModel.findByIdAndUpdate(foodId,{
        $inc:{ likecount:-1}
    })


        return res.status(200).json({
            message:"food Unlike"
        })
    }

    const like =  await likeModel.create({
        user:user._id,
        food:foodId
    })

    await foodModel.findByIdAndUpdate(foodId,{
        $inc:{likecount: 1}
    })

    res.status(201).json({
        message:"Like Successfully",
        like 
    })
}

async function saveFood(req,res) {

    const {foodId} = req.body
    const user = req.user

    const isAlreadysave = await saveModel.findOne({
        user:user._id,
        food:foodId
    })
    if(isAlreadysave){
        await saveModel.deleteOne({user:user._id , food:foodId})

        await foodModel.findByIdAndUpdate(foodId,{
        $inc:{ savecount:-1}
    })

        return res.status(200).json({
            message:"Removed",
        })
    }
    

    const save =  await saveModel.create({
        user:user._id,
        food:foodId
    })

    await foodModel.findByIdAndUpdate(foodId,{
        $inc:{savecount: 1}
    })

    res.status(201).json({
        message:"save Successfully",
        save :true,
        data:save
        
    })
    
}


async function getsavefood(req,res) {

    const user = req.user

    const savedFoods = await saveModel.find({user:user._id}).populate("food")

    // if(!savedFoods || savedFoods.length === 0){
    //     return res.status(400).json({
    //         message:"No saved Food"
    //     })
    // }
    
    res.status(200).json({
        message:"Food is Retrived Successfully",
        savedFoods
    })
}

module.exports = {createFood , getFoodItem , likeFood ,saveFood ,getsavefood}