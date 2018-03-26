const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product.js');

router.get('/', (request, response, next) => {
    // Passing no parameter will find all items
    Product.find()
        .exec()
        .then(docs => {
            if (docs.length > 0) {
                console.log(docs);
                response.status(200).json(docs);
            } else {
                response.status(200).json({
                    message: "No entries yet, just create some Products please!"
                })
            }
        })
        .catch(err => {
            console.log(err);
            response.status(400).json({
                err: "Sorry, an error occured"
            })
        })
})

router.get('/:productID', (request, response, next) => {
    const id = request.params.productID;
    Product.findById(id)
        .exec()
        .then(document => {
            if (document) {
                console.log(document);
                response.status(200).json(document)
            } else {
                response.status(404).json({
                    message: "Could not find product with that ID :("
                })
            }

        })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                error: err
            })
        })
})

router.post('/', (request, response, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        price: request.body.price
    })
    product.save()
        .then(result => {
            console.log(result);
            response.status(201).json({
                message: 'Handling POST requests for /products',
                createdProduct: result
            })
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                error: err
            })
        });

})

router.patch('/:productID', (request, response, next) => {
    const id = request.params.productID;
    const updateOperations = {};

    // Example body input for patch request:
    /* 
    [{"propName" : "name", "value" : "Really not at all that great of a chair man, i am sorry"}] 
    */

    for (const operations of request.body) {
        updateOperations[operations.propName] = operations.value
    }
    Product.update({ _id: id },{$set: updateOperations})
    .exec()
    .then(result => {
        console.log(result);
        response.status(200).json({result})
    })
    .catch(err => {
        console.log(err);
        response.status(500).json({
            error: err
        })
    })
})

router.delete('/:productID', (request, response, next) => {
    const id = request.params.productID;
    Product.remove({
        _id: id
    }).exec()
        .then(result => {
            result.status(400).json({
                message: "Product successfully deleted!"
            });
        })
        .catch(err => {
            response.status(400).json({
                error: err
            })
        })
})

module.exports = router;