require( "./model" );
const multer =require("multer");
const express = require( "express" );

const controller = require( "./controller" );

const router = express.Router( );

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./uploads/subCategory")
    },
    filename (req, file, cb) {
        cb(null , file.originalname)
    }
});

const upload = multer({ storage });

router.post("/v1/",upload.single("file"), controller.createSubCategory);
router.get("/v1/", controller.getAllSubCategory);
router.put("/v1/:id", controller.editSubCategory);
router.get("/:id", controller.getSubCategory);

module.exports = router;