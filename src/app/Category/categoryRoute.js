module.exports = function (app) {
    const category = require("./categoryController");
    const jwtMiddleware = require("../../../config/jwtMiddleware");
  
    app.post("/app/category/add", category.postCategory);

    app.get("/app/category/:userIdx", category.getCategory);

    app.patch("/app/category", category.patchCategory);

  };