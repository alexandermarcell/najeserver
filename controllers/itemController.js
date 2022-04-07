const Item = require('../models/itemModel');

//get all items
const getItems =  async(req, res) => {
    try {
        const items = await Item.find({});
        res.status(200).send(items)
    } catch (error) {
        res.status(400).send(error)
    }
}

//get a specific item
const getSpecificProduct = async(req, res) =>{
    try {
        const item = await Item.findOne({ _id: req.params.id })
        if(!item) {
            res.status(404).send({error: "item not found"})
        }
        res.status(200).send(item)
    } catch (error) {
        res.status(400).send({error: "there is an error"})
    }
}

//add products
const addProduct = async(req, res) => {
    try {
        const newItem = new Item({
            ...req.body, 
            owner: req.user._id
        })
        await newItem.save()
        res.status(201).send(newItem)
    } catch (error) {
        res.status(400).send({
            message: "error"
        })
    }
}

//update a product
const updateProduct = async(req, res) => {

    const updates = Object.keys(req.body)

    const allowedUpdates = [ 'productName', 'description', 'price' ]

    const isValidOperation = updates.every((update) => 
    allowedUpdates.includes(update))
        if(!isValidOperation){
            return res.status(400).send({error: 'invalid updates' })
        }

    try {
        const product = await Products.findOne({ _id: req.params.id })
        if(!product){
            return res.status(404).send()
        }
        updates.forEach((update) => item[update] = req.body[update])
        await product.save()
        res.send(product)
    } catch (error) {
        res.status(400).send(error)
    }
}

//delete a product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Products.findOneAndDelete( { _id: req.params.id } )
        if(!deletedProduct){
            res.status(404).send({ error: "item not found" })
        }
        res.send(deletedProduct)
    } catch (error) {
        res.status(400).send(error)
    }
}



module.exports = { 
    getItems, 
    addProduct,
    getSpecificProduct,
    updateProduct,
    deleteProduct
}