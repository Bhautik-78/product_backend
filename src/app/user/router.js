require( "./model" );
const express = require( "express" );

const controller = require( "./controller" );

const router = express.Router( );

router.post("/", controller.createUser);
router.get("/v1/:id", controller.getUser);
router.get("/v1/", controller.getAllUser);

module.exports = router;