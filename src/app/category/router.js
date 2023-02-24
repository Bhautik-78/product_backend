require( "./model" );
const multer =require("multer");
const express = require( "express" );

const controller = require( "./controller" );

const router = express.Router( );

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./uploads/category")
    },
    filename (req, file, cb) {
        cb(null , file.originalname)
    }
});

const upload = multer({ storage });

router.get("/v1/getMultiImageByName/:id", controller.getMultiImageByCategoryName)
router.get("/v1/allImage", controller.fetchAllImage);
router.post("/v1/", upload.single("file"), controller.createCategory);
router.put("/v1/multiImage/:categoryName", upload.array("uploadedImages",1000), controller.updateCategoryWithMultiImage);
router.get("/v1/:categoryName", controller.getCategoryByName);
router.get("/v1/", controller.getAllCategory);
router.put("/v1/:id",upload.single("file"), controller.editCategory);
router.get("/", controller.getCategory);
router.delete("/v1/:id", controller.deleteCategory);

module.exports = router;