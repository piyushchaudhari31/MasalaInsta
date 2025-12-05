const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const foodParnetModel = require("../model/foodPartner.model");

async function userRegister(req, res) {
  const { fullName:{firstName , lastName}, email, password , profilepic ,gender } = req.body;

  const userExist = await userModel.findOne({ email });

  if (userExist) {
    return res.status(401).json({
      message: "User is already Exist",
    });
  }

  const boy = "https://avatar.iran.liara.run/public/boy"
  const girl = "https://avatar.iran.liara.run/public/girl"

  const user = await userModel.create({
    fullName:{
      firstName,
      lastName
    },
    email,
    password: await bcrypt.hash(password, 10),
    gender,
    profilepic: gender === "male" ? boy : girl
  });

  const token = jwt.sign({ id: user._id }, process.env.JSON_TOKEN);
  res.cookie("token", token);

  res.status(201).json({
    message: "User Register Sucessfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function userLogin(req, res) {
  const { email, password } = req.body;

  const emailExist = await userModel.findOne({ email });

  if (!emailExist) {
    return res.status(400).json({
      message: "Invalid Email",
    });
  }

  const passwordExist = await bcrypt.compare(password, emailExist.password);

  if (!passwordExist) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ id: emailExist._id }, process.env.JSON_TOKEN);
  res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none"
});
  res.status(200).json({
    message: "Login Successfully",
    token,
    user:{
      fullName:emailExist.fullName.firstName + " " + emailExist.fullName.lastName,
      profilepic:emailExist.profilepic,      
    }
  });
}

async function userLogOut(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Log Out Successfully",
  });
}

async function getData(req,res) {

  const {user} = req

  res.status(200).json({
    message:"Fatch successfully",
    user
  })
}

async function registerFoodPartner(req, res) {
  const { email, contactName, password ,address,businessName ,phone , gender} = req.body;

  const userExist = await foodParnetModel.findOne({ email });

  if (userExist) {
    return res.status(401).json({
      message: "Food-Partner is already Exist with Same Email",
    });
  }

  const boy = "https://avatar.iran.liara.run/public/boy"
  const girl = "https://avatar.iran.liara.run/public/girl"

  const foodPartner = await foodParnetModel.create({
    contactName,
    address,
    businessName,
    phone,
    email,
    gender,
    profilpic: gender === "male" ? boy : girl, 
    password: await bcrypt.hash(password, 10)
  });

  const token = jwt.sign({ id: foodPartner._id }, process.env.JSON_TOKEN);
  res.cookie("token", token);

  res.status(201).json({
    message: "User Register Sucessfully",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      contactName: foodPartner.contactName,
      phone:foodPartner.phone,
      address:foodPartner.address,
      businessName:foodPartner.businessName,
      gender:foodPartner.gender,
      profilpic:foodPartner.profilpic
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const emailExist = await foodParnetModel.findOne({ email });

  if (!emailExist) {
    return res.status(400).json({
      message: "Invalid Email",
    });
  }

  const passwordExist = await bcrypt.compare(password, emailExist.password);

  if (!passwordExist) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ id: emailExist._id }, process.env.JSON_TOKEN);
 res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none"
});
  res.status(200).json({
    message: "Login Successfully",
    token:token
  });
}


async function FoodPartnerLogOut(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Log Out Successfully",
  });
}

module.exports = {
  userRegister,
  userLogin,
  getData,
  userLogOut,
  registerFoodPartner,
  loginFoodPartner,FoodPartnerLogOut
};
