require( "./model" );
const express = require( "express" );

const controller = require( "./controller" );

const router = express.Router( );

router.post("/v1/", controller.createSubCategory);
router.get("/v1/", controller.getAllSubCategory);
router.put("/v1/:id", controller.editSubCategory);
router.get("/:id", controller.getSubCategory);

module.exports = router;