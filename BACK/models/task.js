var mongoose = require('mongoose')

var Schema = mongoose.Schema({

    title:    { type: String },
    date_start: { type: Date },
    date_end:   { type: Date, default:""},
    status:   { type: String },
    description: { type: String }
    
})

module.exports = mongoose.model('Task', Schema)