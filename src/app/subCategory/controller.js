const mongoose = require("mongoose");
const path = require('path');
const subCategory = mongoose.model("subCategory");
require('dotenv').config();

exports.createSubCategory = async (req, res) => {
    try {
        let file = req.file;
        if(file){
            const extname = path.extname(file.originalname);
            let filename = `/uploads/subCategory/${file.originalname}`;
            if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.PNG' || extname === ".webp") {
                req.body.subCategoryImage = filename;
            }else {
                req.body.subCategoryImage = "";
            }
        }
        const isCreated = await subCategory.create(req.body);
        if (isCreated) {
            res.status(200).send({message: "successFully created"})
        } else {
            res.status(400).send({message: "something Went Wrong"})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist"});
    }
};

exports.getAllSubCategory = async (req, res) => {
    try {
        let query = {};
        const application = await subCategory.find(query);
        res.status(200).send(application)
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist"});
    }
};

exports.getSubCategory = async (req, res) => {
    try {
        let query = {
            category: req.params.id,
            active: true
        };
        const application = await subCategory.find(query);
        res.status(200).send(application)
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist"});
    }
};

exports.editSubCategory = async (req, res) => {
    try {
        const isUpdate = await subCategory.updateOne({_id: req.params.id}, req.body);
        if (isUpdate) {
            res.status(200).send({message: "successFully updated"})
        } else {
            res.status(400).send({message: "something Went Wrong"})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist"});
    }
};