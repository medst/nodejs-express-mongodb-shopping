var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var childSchema = new Schema({
    name: String,
    ssCategorie: [String]
});

var schema = new Schema({
    name: String,
    sCategorie: [childSchema],
    brand: [String],
    occasion: [String],
    gifts: [String]
});

module.exports = mongoose.model('childGategorie', childSchema);
module.exports = mongoose.model('Gategorie', schema);