let mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
        productname: String,
        producttype: String,
        price: Number,
        rating: Number,
        upvotes: {type: Number, default: 0},
        specs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductSpecs' }]

    },
    { collection: 'productsdb' });

module.exports = mongoose.model('Product', ProductSchema);
