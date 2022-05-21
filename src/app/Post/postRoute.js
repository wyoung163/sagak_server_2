module.exports = function (app) {
  const post = require("./postController");

  //3.1 게시물 리스트 추출
  app.get("/posts", post.getPosts);

  //2.4 GET 게시글 조회 - 리스트 /app/posts/:userIdx
  app.get("/app/posts/:userIdx", post.getPosts);
};
