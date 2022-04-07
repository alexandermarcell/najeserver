const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getItems, getSpecificProduct, addProduct, updateProduct, deleteProduct } = require('../controllers/itemController');


//See all inventory Items
router.get('/', getItems);

//see one specific item
router.get('/:id', getSpecificProduct);

//create new product
router.post('/', auth, addProduct);

//update a product
router.patch('/:id', auth, updateProduct);

//delete a product
router.delete('/:id', auth, deleteProduct);


    
module.exports = router;