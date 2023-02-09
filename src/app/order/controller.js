const mongoose = require("mongoose");
const Order = mongoose.model("order");
const User = require('../user/model');
require('dotenv').config();

exports.createOrder = async (req, res) => {
    try {
        if (!req.body.userId) {
            res.status(201).send({message: "user not found!", success: false})
        } else {
            const data = await User.findOne({_id: req.body.userId});
            if (!data) {
                res.status(201).send({message: "user not found!", success: false})
            } else {
                const isCreated = await Order.create(req.body);
                if (isCreated) {
                    res.status(200).send({message: "successFully created", success: true})
                } else {
                    res.status(400).send({message: "something Went Wrong"})
                }
            }
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist"});
    }
};

exports.getOrder = async (req, res) => {
    try {
        let query = {};
        const application = await Order.find(query);
        res.status(200).send(application)
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist"});
    }
};

exports.editOrder = async (req, res) => {
    try {
        const isUpdate = await Order.updateOne({_id: req.params.id}, req.body);
        if (isUpdate) {
            res.status(200).send({message: "successFully updated"})
        } else {
            res.status(400).send({message: "something Went Wrong"})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist"});
    }
};
