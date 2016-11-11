var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    brand: {type: String},
    categorie: {type: String},
    subCategorie: {type: String},
    subSubCategorie: {type: String},
    qty: {type: Number, required: true},
    disccount: {type: Number, default: 0},
    occasion: {type: String},
    updated: {type: Date, default: Date.now},
    gifts: {type: String},
    likes: {type: Number, default: 0},
    comments: [{ id: Schema.Types.ObjectId ,title: String ,name: String ,body: String, date: Date }],
    color: [String],
    size: [String],
    images:[{path: String, color: String, sizes: [String]}],
    price: {type: Number, required: true}
});


module.exports = mongoose.model('Products', schema);