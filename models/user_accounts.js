let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
        username: String,
        email: String,
        password: String
    },
    { collection: 'useraccountdb' });

module.exports = mongoose.model('UserAccount', UserSchema);
