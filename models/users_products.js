let mongoose = require('mongoose');

let UsersSchema = new mongoose.Schema({
        username: String,
        email: String,
        password: String
    },
    {collection: 'users_products'});

module.exports = mongoose.model('Users', UsersSchema);
