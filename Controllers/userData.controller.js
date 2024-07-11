const mongoose = require("mongoose")

const UserData = require("../model/UserData.model");
const User = require("../model/User.model")
const updateUserData = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await UserData.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    const updateUserData = await UserData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(202).json(updateUserData);
  } catch (error) { 
    res
      .status(500)
      .json({ message: "Error occurred while updating user data", error });
  }
};

const studentdata = async(req, res) =>{
  try {
      const id = req.params.id;
      const userExist = await User.findById(id);
      if(!userExist){
          return res.status(404).json({msg: "User not found"});
      }
      res.status(200).json(userExist);
      
  } catch (error) {
      res.status(500).json({error: error});
  }
}

const addUserData = async (req, res) => {
  try {
    const userData = new UserData(req.body);
    if (!userData) {
      res.status(400).json({ message: "Invalid user data" });
    }
    const result = await userData.save();
    res
      .status(201)
      .json({ message: "User data added successfully", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred while adding user data", error });
  }
};

// const getAllUserData = async (req, res) => {
//   try {
//     const result = await UserData.find();
//     if (!result) {
//       res.status(404).json({ message: "User data not found" });
//     }
//     res
//       .status(200)
//       .json({ message: "All user data fetched successfully", data: result });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error occurred while fetching user data", error });
//   }
// };

const deleteUserData = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await UserData.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    const deletedUser = await UserData.findByIdAndDelete(id);
    res.status(200).json({message: "User deleted successfully"});
  } catch (error) {
    res.status(500).json({error: error});
  }
};
 

 

const getAllUserData = async (req, res) => {
  try {
    const result = await User.find();
    if (!result) {
      res.status(404).json({ message: "User data not found" });
    }
    res
      .status(200)
      .json({ message: "All user data fetched successfully", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred while fetching user data", error });
  }
};
 
module.exports = { addUserData, updateUserData, getAllUserData,deleteUserData,studentdata };
