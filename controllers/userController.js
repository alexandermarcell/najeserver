const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Register New User
//public
//Post request

const registerUser =  asyncHandler(async (req, res) => {
    const { name, phone, address, email, password } = new User(req.body)

    if( !name || !phone || !address || !email || !password ) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }

    //hash pasword
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

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
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

const loginUser =  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //check for user email
    const user = await User.findOne({ email });

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            phone: user.phone,
            address: user.address,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
    // try {
    //     const user = await User.findByCredentials(req.body.email, req.body.password)
    //     const token = await user.generateAuthToken()
    //     res.send({ user, token })
    // } catch (error) {
    //     console.log(error)
    //     res.status(400).send(error)
    // }
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
    const { _id, name, email, token } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
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