const mongoose = require("mongoose");

const serverConfig = require(`./environments/${process.env.NODE_ENV || "production"}.js`);

module.exports = function (app) {
    mongoose.set('strictQuery', true);
    mongoose.connect(serverConfig.mongoUrl, {useUnifiedTopology: true, useNewUrlParser: true});
    mongoose.Promise = global.Promise;

    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGHUP", cleanup);

    if (app) {
        app.set("mongoose", mongoose);
    }
};

function cleanup() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
}
