const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const userOrder = new Schema({
    partyName: String,
    orderDetail: Object,
    mobileNumber: String,
    orderStatus: String
}, {
    timestamps: true,
});

module.exports = mongoose.model( "order", userOrder );
