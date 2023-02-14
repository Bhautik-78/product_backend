require( "./model" );
const express = require( "express" );

const controller = require( "./controller" );

const validateToken = require("../../middlewares/validateToken");

const router = express.Router( );

router.post("/", controller.createOrder);
router.get("/v1/", controller.getOrder);
router.get("/:id", controller.getUserOrder);
router.put("/v1/:id", controller.editOrder);

module.exports = router;
