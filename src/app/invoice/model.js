const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const userInvoice = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    orderAmount: String,
    tokenAmount: String,
    paymentMode: String,
    dueDate: String
}, {
    timestamps: true,
});

module.exports = mongoose.model( "invoice", userInvoice );
