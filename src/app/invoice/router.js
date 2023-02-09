require( "./model" );
const express = require( "express" );

const controller = require( "./controller" );

const router = express.Router( );

router.post("/v1/", controller.createInvoice);
router.get("/v1/", controller.getInvoice);

module.exports = router;
