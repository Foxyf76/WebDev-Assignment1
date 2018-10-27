let mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
        productname: String,
        producttype: String,
        price: Number,
        rating: Number,
        upvotes: {type: Number, default: 0},
        specs: [
            {
                cameraquality: {type: Number, default: 0},
                ram: {type: Number, default: 0},
                processor: {type: String, default: "none"},
                screensize: {type: Number, default: 0},
                batterysize: {type: Number, default: 0},
                _id: { _id : false },
            }
        ]

    },
    {collection: 'productsdb'});

module.exports = mongoose.model('Product', ProductSchema);
