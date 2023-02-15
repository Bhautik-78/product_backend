const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const Category = new Schema({
    active: {
        type: Boolean,
        default: true
    },
    categoryName: String,
    categoryImage: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model( "category", Category );