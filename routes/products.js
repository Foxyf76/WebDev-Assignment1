let fuzzy = require("fuse.js"); // used fuse.js library for fuzzy search
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
};

router.editProduct = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Product.findByIdAndUpdate(req.params.id, {
            $set: {
                    productname: req.body.productname,
                    producttype: req.body.producttype,
                    price: req.body.price,
                    rating: req.body.rating,
                    upvotes: req.body.upvotes,
                    spec: req.body.specs
                }
        },

        function (err, products) {
            if (err) {
                throw err;
            }
            else {
                res.send(products)
            }
        }
    )
};


router.addSpecs = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {
            $push: { // if the product ID is found, push the following into the 'specs' array
                specs: {
                    cameraquality: req.body.cameraquality,
                    ram: req.body.ram,
                    processor: req.body.processor,
                    screensize: req.body.screensize,
                    batterysize: req.body.batterysize,
                    id: req.params.id,
                }
            }
        },
        function (err, products) {
            if (err) {
                throw err;
            }
            else {
                res.send(products)
            }
        }
    )
};


router.incrementUpvotes = (req, res) => {
    var product = getByValue(products, req.params.id);

    if (product != null) {
        product.upvotes += 1;
        res.json({status: 200, message: 'UpVote Successful', product: product});
    }
    else
        res.send('Product NOT Found - UpVote NOT Successful!!');

}

router.findFuzzyName = (req, res) => {
    Product.find(function (err, products) {
        if (err)
            res.send(err);
        var options = {
            keys: ['productname'], // search by 'productname' only, can be expanded to multiple keys
        };
        var fuse = new fuzzy(products, options);
        var result = fuse.search(req.params.productname);
        if (result != null) {
            res.send(result)
        }
        else
            res.send('No product found!');
    })
};

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
};

router.downvote = (req, res) => {
    Product.findById(req.params.id, function (err, product) {
        if (err)
            res.json({message: 'Product NOT Found!', errmsg: err});
        else {
            product.upvotes -= 1;
            product.save(function (err) {
                if (err)
                    res.json({message: 'Product NOT downvoted!', errmsg: err});
                else
                    res.json({message: 'Product Successfully downvotes!', data: product});
            });
        }
    });
};

router.deleteProduct = (req, res) => {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.json({message: 'Product NOT DELETED!', errmsg: err});
        else
            res.json({message: 'Product Successfully Deleted!'});
    });
};

router.findTotalVotes = (req, res) => {
    Product.find(function (err, products) {
        if (err)
            res.send(err);
        else
            res.json({totalvotes: getTotalVotes(products)});
    });
};

router.findProductByName = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Product.find({"productname": req.params.productname}, (function (err, products) {
        if (err)
            res.send(err);
        res.send((JSON.stringify(products, null, 5)))
    }))
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

module.exports = router;
