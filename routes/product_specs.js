let ProductSpecs = require('../models/product_specs');
let Product = require('../models/products');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var mongodbUri = 'mongodb://<name>:<password>@ds131373.mlab.com:31373/productsdb';

mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    ProductSpecs.find(function (err, products) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(products, null, 5));
    });
};


module.exports = router;
