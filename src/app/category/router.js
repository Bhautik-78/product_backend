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

router.post("/v1/", upload.single("file"), controller.createCategory);
router.get("/v1/", controller.getAllCategory);
router.put("/v1/:id", controller.editCategory);
router.get("/", controller.getCategory);

module.exports = router;