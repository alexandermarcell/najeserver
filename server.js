require('dotenv').config();

const connectDB = require('./config/db');

const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;
const productsRoutes = require('./routes/products');
const shoppingCartRoutes = require('./routes/shoppingCart')
const userRoutes = require('./routes/users');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

connectDB();

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.use(express.urlencoded({extended: false}))


//Stripe API 
app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        customer_id: 'id',
        billing_address_collection: 'auto',
        shipping_address_collection: {
            allowed_countries: ['US', 'CA'],
        },
        line_items: [
            {
                price: '{{PRICE_ID}}',
                quantity: 1,
            },
        ],
        mode: 'payment',
        succes_url: `${process.env.CLIENT_URL}? success=true`,
        cancel_url: `${process.env.CLIENT_URL}? canceled=true`,
        automatic_tax: {enabled: true},
    });

    res.redirect(303, session.url);
});

app.use('/api/v1/shop/items', productsRoutes);
app.use('/api/v1/shop/users', userRoutes);
app.use('/api/v1/shop/cart', shoppingCartRoutes);


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')))

//     app.get('*', (req, res) => {
//         res.sendFile(
//             path.resolve(__dirname, '../','frontend', 'build', 'index.html')
//         )
//     })
// }else {
//     app.get('/', (req, res) => {
//         res.send('Please set to production')
//     })
// }


app.listen(PORT, () => {
    console.log(`This app is listening on port: ${PORT}`)
});