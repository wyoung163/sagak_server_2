module.exports = function (app) {
  const post = require("./postController");

  //3.1 게시물 리스트 추출
  app.get("/posts", post.getPosts);
};
