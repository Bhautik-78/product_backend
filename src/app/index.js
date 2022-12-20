const orderRouter = require("./order/router");

module.exports = (app) => {
    app.use("/api/order", orderRouter);
};
