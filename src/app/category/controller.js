const mongoose = require("mongoose");
const path = require('path');
const Category = mongoose.model("category");
require('dotenv').config();

exports.createCategory = async (req, res) => {
    try {
        let file = req.file;
        if(file){
            const extname = path.extname(file.originalname);
            let filename = `/uploads/category/${file.originalname}`;
            if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.PNG' || extname === ".webp") {
                req.body.categoryImage = filename;
            }else {
                req.body.categoryImage = "";
            }
        }
        const isCreated = await Category.create(req.body);
        if (isCreated) {
            res.status(200).send({message: "successFully created"})
        } else {
            res.status(400).send({message: "something Went Wrong"})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist"});
    }
};

exports.getAllCategory = async (req, res) => {
    try {
        let query = {};
        const application = await Category.find(query);
        res.status(200).send(application)
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist"});
    }
};

exports.getCategory = async (req, res) => {
    try {
        let query = {
            active: true
        };
        const application = await Category.find(query);
        res.status(200).send(application)
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist"});
    }
};

exports.editCategory = async (req, res) => {
    try {
        const isUpdate = await Category.updateOne({_id: req.params.id}, req.body);
        if (isUpdate) {
            res.status(200).send({message: "successFully updated"})
        } else {
            res.status(400).send({message: "something Went Wrong"})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist"});
    }
};