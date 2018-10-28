let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
        username: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
       // products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] <--- Not working, needs to be implemented in assignment 2
    },
    {collection: 'useraccountdb'});


module.exports = mongoose.model('User', UserSchema);

