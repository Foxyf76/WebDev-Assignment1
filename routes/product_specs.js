let ProductSpecs = require('../models/product_specs');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var mongodbUri = 'mongodb://Foxyf76:vzT8F2xNvtmL359@ds131373.mlab.com:31373/productsdb';

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

    ProductSpecs.find(function (err, specs) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(specs, null, 5));
    });
};

router.addSpecs = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    let product = new ProductSpecs();

    product.productname = req.body.productname;
    product.cameraquality = req.params.productname;
    product.ram = req.params.ram;
    product.processor = req.params.processor;
    product.screensize= req.params.screensize;
    product.batterysize = req.params.batterysize;

    product.save(function (err) {
        if (err) {
            res.send("Cannot find! " + err)
        }
        // return a suitable error message
        else {
            res.json({message: 'Product Successfully Added!', data: product});
        }
        // return a suitable success message
    });
}

module.exports = router;
