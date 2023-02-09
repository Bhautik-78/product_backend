const mongoose = require("mongoose");
const Invoice = mongoose.model("invoice");
require('dotenv').config();

exports.createInvoice = async (req, res) => {
    try {
        const isCreated = await Invoice.create(req.body);
        if (isCreated) {
            res.status(200).send({message: "successFully created", success: true})
        } else {
            res.status(400).send({message: "something Went Wrong"})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist"});
    }
};

exports.getInvoice = async (req, res) => {
    try {
        let query = {};
        const application = await Invoice.find(query);
        res.status(200).send(application)
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist"});
    }
};