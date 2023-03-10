const mongoose = require("mongoose");
const Order = mongoose.model("order");
const User = require('../user/model');
require('dotenv').config();

exports.createOrder = async (req, res) => {
    try {
        if (!req.body.mobileNumber) {
            res.status(201).send({message: "user not found!", success: false})
        } else {
            const data = await User.findOne({userMobileNumber: req.body.mobileNumber});
            if (!data) {
                res.status(201).send({message: "user not found!", success: false})
            } else {
                const isCreated = await Order.create(req.body);
                if (isCreated) {
                    res.status(200).send({message: "successFully created", success: true})
                } else {
                    res.status(400).send({message: "something Went Wrong", success: false})
                }
            }
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.getOrder = async (req, res) => {
    try {
        let query = {};
        const application = await Order.find(query).populate("category").populate("subCategory");
        res.status(200).send({application, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.getUserOrder = async (req, res) => {
    try {
        const user = await User.findById({_id: req.params.id});
        if(user){
            const orderData = await Order.find({mobileNumber: user.userMobileNumber}).populate("category").populate("subCategory");
            res.status(200).send({orderData, success: true})
        }else {
            res.status(400).send({message: "something Went Wrong", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.editOrder = async (req, res) => {
    try {
        const isUpdate = await Order.updateOne({_id: req.params.id}, req.body);
        if (isUpdate) {
            res.status(200).send({message: "successFully updated", success: true})
        } else {
            res.status(400).send({message: "something Went Wrong", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};
