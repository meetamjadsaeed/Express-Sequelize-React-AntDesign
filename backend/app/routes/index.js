const products = require("./products.routes");
const users = require("./users.routes");
const authenticateUser = require("./authentication.routes");



const appRouter = (app) => {
  app.use("/products", products);
  app.use("/users", users);
  app.use("/user", authenticateUser);


};

module.exports = appRouter;
