let mongoose = require('mongoose');

let ProductSpecsSchema = new mongoose.Schema({
        productname: String,
        cameraquality: Number,
        ram: Number,
        processor: String,
        screensize: Number,
        batterysize: Number
    },
    {collection: 'specs'});

module.exports = mongoose.model('ProductSpecs', ProductSpecsSchema);
