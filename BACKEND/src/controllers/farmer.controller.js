import mongoose, { isValidObjectId } from "mongoose";
import { Farmer } from "../models/farmer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Controller to add a new farmer
const addFarmer = asyncHandler(async (req, res) => {
    const { username, name, password, gender, address, pincode, email, farmingCertifications, farmingDetails, phoneNumber } = req.body;

    const newFarmer = new Farmer({
        username,
        name,
        password,
        gender,
        address,
        pincode,
        email,
        farmingCertifications,
        farmingDetails,
        phoneNumber,
    });

    await newFarmer.save();
    res.status(201).json(new ApiResponse("Farmer added successfully", newFarmer));
});

// Controller for farmer login
const loginFarmer = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "Username or email is required!");
    }

    // Find farmer by username or email
    const farmer = await Farmer.findOne({
        $or: [{ username }, { email }]
    });

    if (!farmer) {
        throw new ApiError(404, "Farmer does not exist!");
    }

    // Check if the password is correct
    const isPasswordValid = await farmer.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Password is incorrect!");
    }

    // Generate access and refresh tokens
    const accessToken = farmer.generateAccessToken();
    const refreshToken = farmer.generateRefreshToken();

    // Save refresh token to the farmer's document
    farmer.refreshtoken = refreshToken;
    await farmer.save({ validateBeforeSave: false });

    // Exclude password and refresh token from the response
    const loggedInFarmer = await Farmer.findById(farmer._id).select("-password -refreshtoken");

    // Send tokens and farmer details in the response
    res.status(200).json(new ApiResponse("Farmer logged in successfully", {
        farmer: loggedInFarmer,
        accessToken,
        refreshToken,
    }));
});

// Controller for farmer logout
const logoutFarmer = asyncHandler(async (req, res) => {
    await Farmer.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshtoken: 1 // removes the refresh token from the document
        }
    }, {
        new: true
    });

    const options = {
        httpOnly: true,
        secure: true
    };

    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse("Farmer logged out successfully"));
});

// Controller to get details of a specific farmer by ID
const getFarmerDetails = asyncHandler(async (req, res) => {
    const { farmerId } = req.params;

    if (!isValidObjectId(farmerId)) {
        throw new ApiError("Invalid Farmer ID", 400);
    }

    const farmer = await Farmer.findById(farmerId);

    if (!farmer) {
        throw new ApiError("Farmer not found", 404);
    }

    res.status(200).json(new ApiResponse("Farmer details retrieved successfully", farmer));
});

// Controller to get all farmers
const getAllFarmers = asyncHandler(async (req, res) => {
    const allFarmers = await Farmer.find();

    if (!allFarmers || allFarmers.length === 0) {
        throw new ApiError("No farmers found", 404);
    }

    res.status(200).json(new ApiResponse("All farmers retrieved successfully", allFarmers));
});

// Controller to update a farmer by ID
const updateFarmer = asyncHandler(async (req, res) => {
    const { farmerId } = req.params;
    const updateData = req.body;

    if (!isValidObjectId(farmerId)) {
        throw new ApiError("Invalid Farmer ID", 400);
    }

    const updatedFarmer = await Farmer.findByIdAndUpdate(farmerId, updateData, { new: true, runValidators: true });

    if (!updatedFarmer) {
        throw new ApiError("Farmer not found", 404);
    }

    res.status(200).json(new ApiResponse("Farmer updated successfully", updatedFarmer));
});

// Controller to delete a farmer by ID
const deleteFarmer = asyncHandler(async (req, res) => {
    const { farmerId } = req.params;

    if (!isValidObjectId(farmerId)) {
        throw new ApiError("Invalid Farmer ID", 400);
    }

    const deletedFarmer = await Farmer.findByIdAndDelete(farmerId);

    if (!deletedFarmer) {
        throw new ApiError("Farmer not found", 404);
    }

    res.status(200).json(new ApiResponse("Farmer deleted successfully", deletedFarmer));
});

export {
    addFarmer,
    loginFarmer,
    logoutFarmer,
    getFarmerDetails,
    getAllFarmers,
    updateFarmer,
    deleteFarmer,
};
