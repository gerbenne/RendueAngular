/*
Import
*/
    const mongoose = require('mongoose');
    const { Schema } = mongoose;
//

/*
Definition
*/
    const scoreSchema = new Schema({
        user: String,
        tap: Number,
        date: Date
    })
//

/*
Export
*/
    const ScoreModel = mongoose.model('score', scoreSchema);
    module.exports = ScoreModel;
//