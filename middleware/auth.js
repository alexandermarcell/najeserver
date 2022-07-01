const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const auth = asyncHandler( async(req, res, next) =>{
  let token 

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      //get token from header
      token = req.headers.authorization.split(' ')[1];
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      //get user from tokne
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not Authorized');
    }
  }

  if(!token){
    res.status(401)
    throw new Error('Token, not detected. Not Authorized');
  }
  // try {
  //   const token = req.header('Authorization').replace('Bearer ', '')
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET)
  //   const user = await User.findOne({ _id: decoded._id, 'tokens.token':token })

  //   if(!user) {
  //     throw new Error
  //   }
  //     req.token = token
  //     req.usesr = user
  //   next()
  // } catch (error) {
  //   res.status(401).send({
  //     error: "Authentication Required"
  //   })
  // }
})

module.exports = auth