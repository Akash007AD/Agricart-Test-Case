import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
//const jwt = pkg
import mongoose from 'mongoose';

const { Schema } = mongoose;
//schema for user of our website
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    // coverImage :{
    //     type : String,
    // },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    // accesstoken:{
    //     type:String,
    // },
    // refreshtoken:{
    //     type:String,
    // }
    
}, {
    timestamps: true
});


//here we used the pre method of mongoose to encrypt the password before saving info  
userSchema.pre("save" , async function (next)  {
    if(!this.isModified("password")) return next()// had this if condition not been used then the password would eb encrypted everytime the user changes any of its information

    this.password =await bcrypt.hash(this.password,10)
    next()
})

//mogoose allows us to use any method of our choice and make it one as per needed
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken =  function (){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            name : this.name,
            address:this.address,
            pincode:this.pincode,
            gender:this.gender,
            email : this.email,
            phoneNumber:this.phoneNumber,
            //payloads for a particuilar jwt access toekn and is unique for all diffferent users
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY//expiry
        }
    )
}
userSchema.methods.generateRefreshToken =  function () {
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY//expiry
        }
    )
}


//refresh token and access token are the same damn thing but the duration of refresh token is more than that of access token usage of only access token is alos allowed
export const User = mongoose.model("User", userSchema);