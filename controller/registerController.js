const User = require('../model/User')
const path = require("path");
const fsPromises = require("fs").promises;
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ Message: `Username and Password are required.` });
  const duplicate = await User.findOne({ username:user}).exec();
  if (duplicate) res.sendStatus(409); //Conflict
  try {
    const hashedpwd = await bcrypt.hash(pwd, 10);
    // create and store the new user
    const result = await User.create({
      "username": user,      
      "password": hashedpwd,
    });  
    console.log(result)
    res.status(201).json({ success: `New user ${user} created.` });
  } catch (error) {
    res.status(500).json({ ERROR: `${error.message}` });
  }
};

module.exports = { handleNewUser };
