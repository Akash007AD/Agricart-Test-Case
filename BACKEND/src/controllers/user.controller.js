import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// const registerUser = asyncHandler( async (req,res) => {
//     //get user details from frontend 
//     const { username, name, password, gender, address, pincode, email, phoneNumber,coverImage } = req.body;
    
//     //check if user already exist - check user name and emai existence
//     //cover image - if available upload to cloudinary
//     //create user object - create entry in db
//     //remove password and refresh token field
//     //check for user creattion
//     //return res
// })

// export {registerUser}

// Controller to add a new user
const addUser = asyncHandler(async (req, res) => {
    const { username, name, password, gender, address, pincode, email, phoneNumber } = req.body;

    const newUser = new User({
        username,
        name,
        password,
        gender,
        address,
        pincode,
        email,
        phoneNumber,
    });



    //notworking
    //validate user - if any field is empty
    if(
        [username, name, password, gender, address, pincode, email, phoneNumber].some( (field) => {
        field?.trim() === ""
        })
    ){
        throw new ApiError(400,"name,username,password,email are required!")
    }






    //check if the user already exists
    const existedUser = await User.findOne({ 
        $or : [ { username } , { name }]
    })
    if(existedUser) {
        throw new ApiError(409 , "Username or email already exists")
    }

    await newUser.save();

    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshtoken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    res.status(201).json(new ApiResponse("User added successfully", newUser));
});

/*

//controller to login user a registered user
const loginUser = asyncHandler(async(req,res) => {
    //req body -> data
    const {username,email,password} = req.body;
    if(!username && !email){
        throw new ApiError(400,"username or email is required!")
    }
    //username or email - use either one to find the user
    const user = await User.findOne({
        $or : [{username},{email}] // the $or operator helps in passing an array of objects fron which we can check the existence of any one to see if th euser is present or not
    })//here User is used because User is a mongodb model and the findone is a mongodb method

    if(!user){
        throw new ApiError(404,"user does not exist!");
    }


    //password check
    // isPasswordCorrect method is created by me and hence is accesible by my user which is saved as "user" with a "small u"

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401,"Password is incorrect!");
    }

    //access or refresh token

    //since we might use the access and refresh token amny times and hence many time it will be rewquierd to be geenrated .. we need are making method which we can access any time
    const generateAccessandRefreshToken = async(userId) =>{
        try{
            await User.findById(userId);
            const accesstoken = user.generateAccessToken();//this is providded to the user

            const refreshtoken = user.generateRefreshToken();///this is stored in the database so that we do not have to ask th euser again and again for the password
            user.refreshtoken = refreshtoken;
            await user.save({validateBeforeSave : false})

            return { accesstoken,refreshtoken };

        }catch(error){
            throw new ApiError(500,"something went wron gwhile generating refresh and access token!");
        }
    }
    const {accesstoken,refreshtoken} = await generateAccessandRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshtoken");

    const options = {
        httpOnly : true,
        secure : true,
    }

    return res
    .status(200)
    .cookie("accesstoken" , accesstoken,options)
    .cookie("refreshtoken",refreshtoken,options)
    .json(
        new ApiResponse(
            200,{
            user : loggedInUser , accesstoken,
            refreshtoken
            },
            "User Logged In Successfully!"
        )
    )
    //send cookies
})
*/
/*
const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "Username or email is required!");
    }

    // Find user by username or email
    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(404, "User does not exist!");
    }

    // Check if the password is correct
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Password is incorrect!");
    }

    // Generate access and refresh tokens
    const generateAccessandRefreshToken = async (user) => {
        try {
            const accesstoken = user.generateAccessToken();
            const refreshtoken = user.generateRefreshToken();
            user.refreshtoken = refreshtoken;
            await user.save({ validateBeforeSave: false });
            return { accesstoken, refreshtoken };
        } catch (error) {
            throw new ApiError(500, "Something went wrong while generating tokens!");
        }
    };

    // Get the generated tokens
    const { accesstoken, refreshtoken } = await generateAccessandRefreshToken(user);

    // Exclude password and refreshToken from the user details
    const loggedInUser = await User.findById(user._id).select("-password -refreshtoken");

    // Return the tokens and user details in the response body
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accesstoken, refreshtoken },
                "User Logged In Successfully!"
            )
        );
});
*/
const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        return res.status(400).json(new ApiResponse(
            400,
            null,
            "Username or email is required!"
        ));
    }

    // Find user by username or email
    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        return res.status(404).json(new ApiResponse(
            404,
            null,
            "User does not exist!"
        ));
    }

    // Check if the password is correct
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        return res.status(401).json(new ApiResponse(
            401,
            null,
            "Password is incorrect!"
        ));
    }

    // Generate access and refresh tokens
    const generateAccessandRefreshToken = async (user) => {
        try {
            const accesstoken = user.generateAccessToken();
            const refreshtoken = user.generateRefreshToken();
            user.refreshtoken = refreshtoken;
            await user.save({ validateBeforeSave: false });
            return { accesstoken, refreshtoken };
        } catch (error) {
            throw new ApiError(500, "Something went wrong while generating tokens!");
        }
    };

    try {
        // Get the generated tokens
        const { accesstoken, refreshtoken } = await generateAccessandRefreshToken(user);

        // Exclude password and refreshToken from the user details
        const loggedInUser = await User.findById(user._id).select("-password -refreshtoken");

        // Return the tokens and user details in the response body
        return res.status(200).json(new ApiResponse(
            200,
            { user: loggedInUser, accesstoken, refreshtoken },
            "User Logged In Successfully!"
        ));
    } catch (error) {
        // Handle any errors during token generation
        return res.status(500).json(new ApiResponse(
            500,
            null,
            "An error occurred during login. Please try again."
        ));
    }
});



  
const logOutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshtoken : 1//removes the field from doc
            }
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})





// Controller to get details of a specific user by ID
const getUserDetails = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // if (!isValidObjectId(userId)) {
    //     throw new ApiError("Invalid User ID", 400);
    // }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError("User not found", 404);
    }

    res.status(200).json(new ApiResponse("User details retrieved successfully", user));
});

// Controller to get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const allUsers = await User.find();

    if (!allUsers || allUsers.length === 0) {
        throw new ApiError("No users found", 404);
    }

    res.status(200).json(new ApiResponse("All users retrieved successfully", allUsers));
});

// Controller to update a user by ID
const updateUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;

    if (!isValidObjectId(userId)) {
        throw new ApiError("Invalid User ID", 400);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

    if (!updatedUser) {
        throw new ApiError("User not found", 404);
    }

    res.status(200).json(new ApiResponse("User updated successfully", updatedUser));
});

// Controller to delete a user by ID
const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        throw new ApiError("Invalid User ID", 400);
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
        throw new ApiError("User not found", 404);
    }

    res.status(200).json(new ApiResponse("User deleted successfully", deletedUser));
});

export {
    addUser,
    loginUser,
    logOutUser,
    getUserDetails,
    getAllUsers,
    updateUser,
    deleteUser
};