const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const Category = new Schema({
    active: Boolean,
    categoryName: String
}, {
    timestamps: true,
});

module.exports = mongoose.model( "category", Category );