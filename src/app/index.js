const orderRouter = require("./order/router");
const categoryRouter = require("./category/router");
const subCategoryRouter = require("./subCategory/router");
const userRouter = require("./user/router");
const invoiceRouter = require("./invoice/router");

module.exports = (app) => {
    app.use("/api/order", orderRouter);
    app.use("/api/category", categoryRouter);
    app.use("/api/subCategory", subCategoryRouter);
    app.use("/api/user", userRouter);
    app.use("/api/invoice", invoiceRouter);
};
