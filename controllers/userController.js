const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


//Register New User
//public
//Post request
const registerUser = asyncHandler( async(req, res) => {
    const { name, phone, address, email, password} = req.body

    if (!name  || !phone || !address || !email || !password){
        res.status(400).json({
            'message': "Please add all fields"
        })
    }

    //check if user exists
    const userExists = await User.findOne({
        email
    })

    if (userExists){
        res.status(400).json({
            'message': 'user already exists'
        })
    }

    //hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
        name,
        phone,
        address,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            phone: user.phone,
            address: user.address,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400).json({
            'message':'Invalid User data'
        })
    }
})


//Register New User
//Public
//Post
const loginUser = asyncHandler( async(req, res) => {
    const { email, password } = req.body;

    //verify email
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400).json({
            'message':'Invalid credentials'
        })
    }

    res.json({
        message: 'Login User'
    })
})

//Register New User
//Private
//get
const getMe = asyncHandler( async(req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '120d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}