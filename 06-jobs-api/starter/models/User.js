const mongoose= require('mongoose')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')


const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide a name'],
        minlength:3,
        maxlength:50,
    },
    email:{
        type:String,
        required:[true,'please provide a name'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide valid email'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'please provide password'],
        minlength:6
    },

})

UserSchema.pre('save',async function(next){
    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
    next();
})
//Here the next parameter can also be ignored the funtionality remains the same

UserSchema.methods.createJWT= async function(){
    const token= jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_LIFETIME
    })
    return token
}


module.exports=mongoose.model('User',UserSchema)