const verifyRoles = (...allowedRoles) => {
     return (req,res,next) => {
        if(!req?.roles) return res.sendStatus(401) //Unauthorised
        const rolesArray = [...allowedRoles]
        console.log("name:-------------------------------------->",req.user)        
        console.log(rolesArray)
        console.log(req.roles)
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true)
        if(!result) return res.sendStatus(401) //Unauthorised
        next();
     }
}

module.exports = verifyRoles