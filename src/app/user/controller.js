const mongoose = require("mongoose");
const User = mongoose.model("user");
require('dotenv').config();

exports.createUser = async (req, res) => {
    try {
        const isCreated = await User.create(req.body);
        if (isCreated) {
            res.status(200).send({message: "successFully created", userId: isCreated._id, success: true})
        } else {
            res.status(400).send({message: "something Went Wrong", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.getUser = async (req, res) => {
    try {
        let query = {
            _id: req.params.id
        };
        const application = await User.findOne(query);
        res.status(200).send({application, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.getAllUser = async (req, res) => {
    try {
        let query = {};
        const application = await User.find(query);
        res.status(200).send({application, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};