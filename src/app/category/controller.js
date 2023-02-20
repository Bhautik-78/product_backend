const mongoose = require("mongoose");
const path = require('path');
const Category = mongoose.model("category");
require('dotenv').config();

exports.createCategory = async (req, res) => {
    try {
        let file = req.file;
        if (file) {
            const extname = path.extname(file.originalname);
            let filename = `/uploads/category/${file.originalname}`;
            if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.PNG' || extname === ".webp") {
                req.body.categoryImage = filename;
            } else {
                req.body.categoryImage = "";
            }
        }
        const existData = await Category.find({categoryName: req.body.categoryName});
        if (existData.length > 0) {
            res.status(200).send({message: "categoryName is already exist!"})
        } else {
            const isCreated = await Category.create(req.body);
            if (isCreated) {
                res.status(200).send({message: "successFully created"})
            } else {
                res.status(400).send({message: "something Went Wrong"})
            }
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist"});
    }
};

exports.updateCategoryWithMultiImage = async (req, res) => {
    try {
        let file = req.files;
        if (file.length) {
            let imageArray = [];
            file.forEach((item, index) => {
                const extname = path.extname(item.originalname);
                let filename = `/uploads/category/${item.originalname}`;
                if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.PNG' || extname === ".webp") {
                    imageArray.push(filename)
                } else {
                    imageArray.push("")
                }
            });
            const isCreated = await Category.updateOne({categoryName: req.params.categoryName}, {$set: { categoryImageList: imageArray }});
            if (isCreated) {
                res.status(200).send({message: "successFully created"})
            } else {
                res.status(400).send({message: "something Went Wrong"})
            }
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist"});
    }
};

exports.getCategoryByName = async (req, res) => {
    try {
        const application = await Category.find({categoryName: req.params.categoryName});
        res.status(200).send(application)
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist"});
    }
};

exports.getAllCategory = async (req, res) => {
    try {
        let query = {};
        const application = await Category.find(query).lean();
        application.forEach(object => {
            delete object['categoryImageList'];
        });
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
        const application = await Category.find(query).lean();
        application.forEach(object => {
            delete object['categoryImageList'];
        });
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