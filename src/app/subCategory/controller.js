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
        const existData = await subCategory.find({subCategory: req.body.subCategory});
        if (existData.length > 0) {
            res.status(200).send({message: "subCategoryName is already exist!", success: true})
        } else {
            const isCreated = await subCategory.create(req.body);
            if (isCreated) {
                res.status(200).send({message: "successFully created", success: true})
            } else {
                res.status(400).send({message: "something Went Wrong", success: false})
            }
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.getAllSubCategory = async (req, res) => {
    try {
        let query = {};
        const application = await subCategory.find(query);
        res.status(200).send({application, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.getSubCategory = async (req, res) => {
    try {
        let query = {
            category: req.params.id,
            active: true
        };
        const application = await subCategory.find(query);
        res.status(200).send({application, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.editSubCategory = async (req, res) => {
    try {
        const isUpdate = await subCategory.updateOne({_id: req.params.id}, req.body);
        if (isUpdate) {
            res.status(200).send({message: "successFully updated", success: true})
        } else {
            res.status(400).send({message: "something Went Wrong", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};