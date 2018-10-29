let mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
        productname: {type: String, required: true},
        producttype: {type: String, required: true},
        price: {type: Number, required: true},
        rating: {type: Number, required: true, min:0, max:5},
        upvotes: {type: Number, default: 0},
        specs: [
            {
                cameraquality: {type: Number, default: 0},
                ram: {type: Number, default: 0},
                processor: {type: String, default: "none"},
                screensize: {type: Number, default: 0},
                batterysize: {type: Number, default: 0},
                _id: { _id : false }, // keep the ID of the product rather than make a new one
            }
        ]

    },
    {collection: 'productsdb'});

module.exports = mongoose.model('Product', ProductSchema);
