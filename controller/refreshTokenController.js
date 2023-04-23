const User = require('../model/User')
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.sendStatus("401"); //Unauthorised
  const token = cookies.jwt;  
  const foundUser = await User.findOne({refreshToken:token}).exec();  
  if (!foundUser) return res.sendStatus(403); //Forbidden
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403); //Forbidden
    const roles = Object.values(foundUser.roles)
    const accessToken = jwt.sign(
      { 
          "UserInfo":{
               "username": decoded.username ,
               "roles":roles
           },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "500s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
