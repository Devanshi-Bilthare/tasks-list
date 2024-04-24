const mongoose = require('mongoose')

const listModel = new mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    time:String,
    title:String,
})

const lists = mongoose.model('list',listModel)
module.exports = lists 