const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Orders were fetched, returning list of orders'
    })
})

router.get('/:orderID', (request, response, next) => {
    orderID = request.params.orderID;
    response.status(200).json({
        message: 'Order Details: ',
        orderID: orderID
    })
})

router.post('/', (request, response, next) => {
    response.status(201).json({
        message: 'Order was created!'
    })
})

router.delete('/:orderID', (request, response, next) => {
    orderID = request.params.orderID;
    response.status(200).json({
        message: 'Order deleted! ',
        orderID: orderID
    })
})

router.patch('/:orderID', (request, response, next) => {
    orderID = request.params.orderID;
    response.status(200).json({
        message: 'Order updated! ',
        orderID: orderID
    })
})

module.exports = router;