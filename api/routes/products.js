const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Handling GET requests for /products'
    })
})

router.get('/:productID', (request, response, next) => {
    const productID = request.params.productID;
    response.status(200).json({
        message: 'Handling GET request for /products/id=' + productID,
        productID: productID
    })
})

router.post('/', (request, response, next) => {
    response.status(201).json({
        message: 'Handling POST requests for /products'
    })
})

router.patch('/:productID', (request, response, next) => {
    response.status(200).json({
        message: 'Product updated successfully!'
    })
})

router.delete('/:productID', (request, response, next) => {
    response.status(200).json({
        message: 'Product deleted successfully!'
    })
})

module.exports = router;