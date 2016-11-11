var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    name: {type: String, required: true},
    payementId: {type: String, required: true},
});


module.exports = mongoose.model('Orders', schema);