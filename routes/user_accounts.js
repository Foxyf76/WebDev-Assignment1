let UserAccounts = require('../models/user_accounts');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
// let bcrypt = require('bcrypt'); <----- Caused bug with deployment so had to be removed
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
    res.setHeader('Content-Type', 'application/json');

    UserAccounts.find(function (err, useraccounts) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(useraccounts, null, 5));
    });
};

router.addUser = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let user = new UserAccounts();

    user.username = req.body.username;
    user.email = req.body.email;
   // user.password = encryptPassword(req.body.password);
    user.password = req.body.password;


    user.save(function (err) {
        if (err) {
            res.send("Cannot find! " + err)
        }
        // return a suitable error message
        else {
            res.json({message: 'User Successfully Added!', data: user});
        }
        // return a suitable success message
    })
};

router.changeUsername = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    // if username is found, change to req.body > needs to be implemented with authentication in assignment 2
    UserAccounts.findOneAndUpdate({username: req.params.username}, {$set: {username: req.body.username}}, {new: true}, (err, user) => {
        if (err)
            res.send(err);
        console.log(user);
        res.send(JSON.stringify(user, null, 5));
    });
};

router.deleteUser = (req, res) => {
    UserAccounts.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.json({message: 'User NOT DELETED!', errmsg: err});
        else
            res.json({message: 'User Successfully Deleted!'});
    });
};

// function encryptPassword(password) { <----- Had to remove bcrypt, see above
//     var hashPass = bcrypt.hashSync(password, 10); //needs to be expanded in next assignment, only returns hash password here
//     return hashPass
// }

module.exports = router;
