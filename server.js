require('dotenv').config();

const connectDB = require('./config/db');

const cors = require('cors');
const express = require('express');
const Bodyparser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 5050;

const itemRoutes = require('./routes/item');
const cartRoutes = require('./routes/cart')
const stripeRoutes = require('./routes/stripe')
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

const session = require('express-session');
const MongoStore = require('connect-mongo');

connectDB();

app.use(cors());

//Bodyparser middleware
app.use(Bodyparser.urlencoded({
    extended: false
}));
  
// Include express-session middleware (with additional config options required for Passport session)
app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true, 
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 180 * 60 * 3000 }
}));

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});
  
require('dotenv').config();

app.use(express.json());

app.use(express.static("public"));

app.use(express.urlencoded({extended: false}))

app.use('/api/v1/shop/items', itemRoutes);

app.use('/api/v1/shop/users', userRoutes);

app.use('/api/v1/shop/cart', cartRoutes);

app.use('/api/v1/shop/orders', orderRoutes);

//app.use('/api/v1/shop/checkout', stripeRoutes);
app.use('/api/v1/shop/create-payment-intent', stripeRoutes);

app.listen(PORT, () => {
    console.log(`This server is running on port: ${PORT}`)
});