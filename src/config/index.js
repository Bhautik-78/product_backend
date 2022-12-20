const env = process.env.NODE_ENV || "development";
console.log(env);

const config = require( `./environments/${ env.toLowerCase( ) }` );

module.exports = config;
