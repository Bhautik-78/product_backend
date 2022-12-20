require( "./model" );
const express = require( "express" );

const controller = require( "./controller" );

const validateToken = require("../../middlewares/validateToken");

const router = express.Router( );

router.post("/", controller.createOrder);
router.get("/", controller.getOrder);

module.exports = router;
