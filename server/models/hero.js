const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: {type: String},
    avatar: {type: String },
    title: {type: String},
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
    scores: {
        different:{type: Number},
        skills:{type: Number},
        attack:{type: Number},
        survive:{type: Number},
    },
    skills:[
        {
            icon: {type: String},
            name: {type: String},
            descriptio: {type: String},
            tips: {type: String},
        }
    ],
    items1:[{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
    items2:[{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
    useTips:{type: String},
    battleTips:{type: String},
    teamTips:{type: String},
    partners:[
        {
            hero:{type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
            descriptio: {type: String}
        }
    ]
})


module.exports = mongoose.model('Hero', schema)