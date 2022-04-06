const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticate');
const { getProducts, getSpecificProduct, addProduct, updateProduct, deleteProduct } = require('../controllers/productsController');


//See all inventory Items
router.get('/', getProducts);

//see one specific item
router.get('/:id', getSpecificProduct);

//create new product
router.post('/', auth, addProduct);

//update a product
router.patch('/:id', auth, updateProduct);

//delete a product
router.delete('/:id', auth, deleteProduct);


    
module.exports = router;