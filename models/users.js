let mongoose = require('mongoose');

let UsersSchema = new mongoose.Schema({
        username: String,
        email: String,
        password: String
    },
    {collection: 'users'});

module.exports = mongoose.model('Users', UsersSchema);
