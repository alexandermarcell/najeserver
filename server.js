require('dotenv').config();

const connectDB = require('./config/db');

const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;
const productsRoutes = require('./routes/products');
const shoppingCartRoutes = require('./routes/shoppingCart')
const stripeRoutes = require('./routes/stripe')
const userRoutes = require('./routes/users');

connectDB();

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.use(express.urlencoded({extended: false}))

app.use('/api/v1/shop/items', productsRoutes);
app.use('/api/v1/shop/users', userRoutes);
app.use('/api/v1/shop/cart', shoppingCartRoutes);
app.use('/api/v1/shop/create-payment-intent', stripeRoutes);



app.listen(PORT, () => {
    console.log(`This app is listening on port: ${PORT}`)
});