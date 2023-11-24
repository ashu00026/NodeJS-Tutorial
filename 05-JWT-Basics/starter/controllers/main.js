//mongoose validations
//joi
//check in controller

const jwt= require('jsonwebtoken')
const CustomAPIError= require('../errors/custom-error')

const login= async(req,res)=>{
    const {username,password}=req.body
    if(!username||!password){
    throw new CustomAPIError('plez provide email and password both',400)
    }
    
    const id= new Date().getDate()//dummy
    const token= jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    // console.log(username,password)

    res.status(200).json({msg:'user created',token})
}

const dashboard=async(req,res)=>{
    console.log(req.user)
    const luckyNumber= Math.floor(Math.random()*100)
    res.status(200).json({msg:`hello,${req.user.username}`,secret:`here is your lucky nuber${luckyNumber}`})
}

module.exports={
    login,dashboard
}