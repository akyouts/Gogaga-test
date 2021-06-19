const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    name : { type: String, require:true },
    location: {type: String, require:true }
})

module.exports = mongoose.model('GoGaga',Schema)