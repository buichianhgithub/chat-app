var mongoose = require('mongoose');
var chatSchema = new mongoose.Schema({
    nick: String,
    msg: String,
    group: String,
    created: { type: Date, default: Date.now }
})
module.exports = mongoose.model('Message', chatSchema);