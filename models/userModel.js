const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    email: {
        type: String,
        required: [true, 'Please add a e-mail address'],
        unique: true,
        lowercase: true,
         validate(value) {
             if(!validator.isEmail(value)){
                 throw new Error('E-mail is invalid')
             }
         }
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        unique: true,
        validate(value){
            if (value.toLowerCase().includes('password')){
                throw new Error("Password musn't be be password")
            }
        }
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
}, {
    timestamp: true
})
//added to generate Auth token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 
    process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

///log in users
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("Unable to Login")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    console.log(isMatch)
    if(!isMatch){
        throw new Error("Unable to Login")
    }

    return user
}

//Hash plain password before saving
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User