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
            res.status(200).send({message: "categoryName is already exist!", success: true})
        } else {
            const isCreated = await Category.create(req.body);
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
            const isCreated = await Category.updateOne({categoryName: req.params.categoryName}, {$set: {categoryImageList: imageArray}});
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

exports.getCategoryByName = async (req, res) => {
    try {
        const application = await Category.find({categoryName: req.params.categoryName});
        res.status(200).send({application, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.getAllCategory = async (req, res) => {
    try {
        let query = {};
        const application = await Category.find(query).lean();
        application.forEach(object => {
            delete object['categoryImageList'];
        });
        res.status(200).send({application, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
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
        res.status(200).send({application, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.editCategory = async (req, res) => {
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
        const isUpdate = await Category.updateOne({_id: req.params.id}, req.body);
        if (isUpdate) {
            res.status(200).send({message: "successFully updated", success: true})
        } else {
            res.status(400).send({message: "something Went Wrong", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const isDeleted = await Category.deleteOne({_id: req.params.id});
        if (isDeleted) {
            res.status(200).send({message: "successFully deleted", success: true})
        } else {
            res.status(400).send({message: "something Went Wrong", success: false})
        }
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.fetchAllImage = async (req, res) => {
    try {
        let query = {};
        const application = await Category.find(query).lean();
        const data = application.map(object => ({
            original: object?.categoryImage,
            thumbnail: object?.categoryImage
        }));
        res.status(200).send({data, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};

exports.getMultiImageByCategoryName = async (req, res) => {
    try {
        const application = await Category.findOne({categoryName: req.params.id}).lean();
        const data = application?.categoryImageList?.map(object => ({
            original: object,
            thumbnail: object
        }));
        res.status(200).send({data, success: true})
    } catch (err) {
        res.status(500).send({message: err.message || "data does not exist", success: false});
    }
};