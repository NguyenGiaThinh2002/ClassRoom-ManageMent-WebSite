const User = require("../models/User");
const ClassRoom = require('../models/ClassRoom')
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
class AuthController {
  // [POST] /auth/signup
  async register(req, res) {
    // const {username,password,email} = req.body;

    try {
      const username = req.body.username;
      const photoURL = req.body.photoURL;
      const email = req.body.email;
      const role = req.body.role;
      // const { username, password, email, role } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(200).send("login successful");
      }
      const user = await User.create({ username, photoURL, email, role });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  async getUser(req, res) {
    try {
      const user = await User.find();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getUserById(req, res){
    const listIds = req.query.listIds;
    try {
      const users = await User.find({ _id: { $in: listIds } });
      return res.status(200).json(users);

    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async getOneUser(req, res) {
    try {
      const user = await User.find({ email });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async addUser(req, res) {
    const { selectedUsers } = req.body;
    console.log(selectedUsers);
    try {
      // Find the class by ID
      const classID = req.params.classID;
      const classDocument = await ClassRoom.findById(classID);
    
      if (!classDocument) {
        return res.status(404).json({ success: false, error: 'Class not found' });
      }
      console.log(classDocument.studentID);
      // Filter out existing student IDs to avoid duplicates
      const newStudentIDs = selectedUsers.filter((userId) => !classDocument.studentID.includes(userId));
    
      // Add unique user IDs to the class's studentID array
      classDocument.studentID.push(...newStudentIDs);
    
      // Save the updated class document
      const result = await classDocument.save();
    
      res.status(200).json({ success: true, result });
    } catch (error) {
      // console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
    }
}

module.exports = new AuthController();
