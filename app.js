const express = require('express');
const app = express();
// Morgen = Node Server Logging Tool
const morgan = require('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));

// All the requests to /producs will be forwarded to productRoutes -> see const above
app.use('/products', productRoutes);

// All the requests to /orders will be forwarded to orderRoutes -> see const above
app.use('/orders', orderRoutes);

app.use((request, response, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message:error.message
        }
    })
})
module.exports = app;