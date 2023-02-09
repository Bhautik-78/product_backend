require( "./model" );
const express = require( "express" );

const controller = require( "./controller" );

const router = express.Router( );

router.post("/v1/", controller.createCategory);
router.get("/v1/", controller.getAllCategory);
router.put("/v1/:id", controller.editCategory);
router.get("/", controller.getCategory);

module.exports = router;