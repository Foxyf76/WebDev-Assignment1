let UsersProducts = require('../models/users_products');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var mongodbUri = 'mongodb://######@ds131373.mlab.com:31373/productsdb';

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

    UsersProducts.find(function (err, user_products) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(user_products, null, 5));
    });
};

router.addUsers = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    let user = new UsersProducts();

    user.username = req.body.username;
    user.email = req.params.email;
    user.password = req.params.password;

    user.save(function (err) {
        if (err) {
            res.send("Cannot find! " + err)
        }
        // return a suitable error message
        else {
            res.json({message: 'User Successfully Added!', data: user});
        }
        // return a suitable success message
    });
};

module.exports = router;
