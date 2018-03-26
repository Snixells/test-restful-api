const express = require('express');
const app = express();
// Morgan = Node Server Logging Tool
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// mongoose.connect('mongodb://Snixells:' + process.env.MONGO_ATLAS_PW + '@node-rest-shard-00-00-8j2qj.mongodb.net:27017,node-rest-shard-00-01-8j2qj.mongodb.net:27017,node-rest-shard-00-02-8j2qj.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shard-0&authSource=admin');
// mongoose.connect('mongodb://Snixells:' + 'qouH6xQdnPt6Nsbd' + '@node-rest-shard-00-00-8j2qj.mongodb.net:27017,node-rest-shard-00-01-8j2qj.mongodb.net:27017,node-rest-shard-00-02-8j2qj.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shard-0&authSource=admin');
// mongoose.connect('mongodb+srv://Snixells:' + "qouH6xQdnPt6Nsbd" + '@node-rest-8j2qj.mongodb.net/test');
// mongoose.connect('mongodb+srv://Snixells:' + process.env.MONGO_ATLAS_PW + '@node-rest-8j2qj.mongodb.net/test');

mongoose.connect('mongodb://localhost/restful-shop');

app.use(morgan('dev'));
app.use((bodyParser.urlencoded({extended: true})));
app.use(bodyParser.json());

// Adding Headers to response -> to not get CORS Errors
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Acces-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // OPTIONS request is sent by browsers to see which options are available => in this case PUT, POST, PATCH, DELETE, GET
    if(request === 'OPTIONS'){
        response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return response.status(200).json({});
    }

    // Next is needed so that the following code (routes, e.g.) will be executed
    next();
});

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