const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Register New User
//public
//Post request

const registerUser =  asyncHandler(async (req, res) => {
    const { name, phone, address, email, password } = new User(req.body)

    console.log('inputs',req.body)

    if( !name || !phone || !address || !email || !password ) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }
    console.log('already Exists? : ',userExist)

    //hash the pasword
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
    console.log('new User: ', user)

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            address: user.address,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//loginUser
//Public
//Post

const loginUser =  asyncHandler( async(req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            phone: user.phone,
            address: user.address,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({
            "message":"Something Went Wrong"
        })
    }
})

const logOutUser =  asyncHandler(async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokens) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

const logOutAll = asyncHandler(async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//Register New User
//Private
//get
const getMe = asyncHandler( async(req, res) => {
    const { _id, name, email, phone, address, token } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
        phone,
        address,
        token,
    })
})


module.exports = {
    registerUser,
    loginUser,
    logOutUser,
    logOutAll,
    getMe,
}

//generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '180d',
    })
}

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}