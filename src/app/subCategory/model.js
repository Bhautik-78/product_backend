const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const subCategory = new Schema({
    category: {type: Schema.Types.ObjectId, ref: 'category'},
    subCategory: String,
    subCategoryImage: String,
    active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model( "subCategory", subCategory );