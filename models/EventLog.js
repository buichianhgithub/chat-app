var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    name:String,
    status: String,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EventsLog', EventSchema);



