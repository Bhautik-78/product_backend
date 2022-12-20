const mongoose = require("mongoose");
const Order = mongoose.model("order");
require('dotenv').config();

exports.createOrder = async (req, res) => {
    try {
        const isCreated = await Order.create(req.body);
        if (isCreated) {
            res.status(200).send({message: "successFully created"})
        } else {
            res.status(400).send({message: "something Went Wrong"})
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
