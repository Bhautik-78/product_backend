const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const User = new Schema({
    userName: String,
    userEmailId: String,
    userMobileNumber: String,
    companyName: String,
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model( "user", User );