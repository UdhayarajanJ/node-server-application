const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//@desc Register a user
//@route POST /api/user/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await userModel.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered.");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashed password:', hashedPassword);
    const userDetails = await userModel.create({
        userName,
        email,
        password: hashedPassword
    });
    console.log(`User created ${userDetails}`);
    if (userDetails)
        res.status(201).json({ _id: userDetails._id, email: userDetails.email });
    else {
        res.status(400);
        throw new Error("User data is not valid.");
    }
});

//@desc Login a user
//@route POST /api/user/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userData = await userModel.findOne({ email });
    //compare password with hashed password
    if (userData && (await bcrypt.compare(password, userData.password))) {
        const accessToken = jwt.sign(
            {
                userData: {
                    userName: userData.userName,
                    email: userData.email,
                    id: userData._id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "20m" }
        );
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

//@desc Current user Information
//@route POST /api/user/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.userData);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
};