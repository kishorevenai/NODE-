const User = require('../model/User')
const fsPromises = require('fs').promises
const path = require('path')

const handleLogout = async(req,res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401) //Unauthorised 
    const refreshToken = cookies.jwt
    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser){
       res.clearCookie('jwt',{httpOnly:true,secure:true,maxAge:24 * 60 * 60 *1000})
       return res.sendStatus(204) // Success and cookie cleared
    } 

    foundUser.refreshToken =" "
    const result = await foundUser.save();
    console.log(result)
    
    
    res.clearCookie('jwt',{httpOnly:true,secure:true})    
    res.sendStatus(204) // SUCCESSFULL.....!
}

module.exports = { handleLogout }