let ProductSpecs = require('../models/product_specs');
let Product = require('../models/products');
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

    Product.find(function (err, products) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(products, null, 5));
    });
};

router.findProductSpecs = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Product.findOne({"productname": req.params.productname}, (function (err, result) {
        if (err)
            res.send(err);
        console.log(result)
    }))
};


router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    Product.find({"_id": req.params.id}, function (err, product) {
        if (err) {
            res.send("Cannot find! " + err);
        }
        else {
            res.send(JSON.stringify(product, null, 5));

        }
        // return the donation
    });
};

function getByValue(array, id) {
    var result = array.filter(function (obj) {
        return obj.id == id;
    });
    return result ? result[0] : null; // or undefined
}

function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function (obj) {
        totalVotes += obj.upvotes;
    });
    return totalVotes;
}

router.addProduct = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    let product = new Product();

    product.productname = req.body.productname;
    product.producttype = req.body.producttype;
    product.price = req.body.price;
    product.rating = req.body.rating;
    product.upvotes = req.body.upvotes;


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

router.incrementUpvotes = (req, res) => {
    // Find the relevant donation based on params id passed in
    // Add 1 to upvotes property of the selected donation based on its id
    var product = getByValue(products, req.params.id);

    if (product != null) {
        product.upvotes += 1;
        res.json({status: 200, message: 'UpVote Successful', product: product});
    }
    else
        res.send('Product NOT Found - UpVote NOT Successful!!');

}

router.findFuzzy = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Product.find(function (err, products) {
        if (err)
            res.send(err);

        var products = JSON.stringify(products, null, 55);
        var product = fuzzySearch(products, req.params.productname);
        res.json({product})
    });
};

function fuzzySearch(array, name) {
    var result = array.filter(function (obj) {
        if (obj.contains(name)) {
            return obj
        }
    });
    return result ? result[0] : null; // or undefined
}


router.incrementUpvotes = (req, res) => {

    Product.findById(req.params.id, function (err, product) {
        if (err)
            res.json({message: 'Product NOT Found!', errmsg: err});
        else {
            product.upvotes += 1;
            product.save(function (err) {
                if (err)
                    res.json({message: 'Product NOT UpVoted!', errmsg: err});
                else
                    res.json({message: 'Product Successfully Upvoted!', data: product});
            });
        }
    });
}

router.deleteProduct = (req, res) => {

    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.json({message: 'Product NOT DELETED!', errmsg: err});
        else
            res.json({message: 'Product Successfully Deleted!'});
    });
}

router.findTotalVotes = (req, res) => {

    Product.find(function (err, products) {
        if (err)
            res.send(err);
        else
            res.json({totalvotes: getTotalVotes(products)});
    });

}

module.exports = router;