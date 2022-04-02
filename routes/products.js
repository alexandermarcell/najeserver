const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productsController');


//See all inventory Items
router.get('/', getProducts);



    
module.exports = router;