module.exports = function (app) {
  const post = require("./postController");

  //2.1 POST 게시글 작성 /app/posts/upload
  app.post("/app/posts/upload", post.postSinglePost);

  //2.4 GET 게시글 조회 - 전체 리스트 /app/posts/:userIdx
  //2.5 GET 제목 같은 게시글 조회 - 리스트 /app/posts/:userIdx?postTitle=
  app.get("/app/posts/:userIdx", post.getPostsByTitle);

  //2.6 GET 개별 게시글 조회 /app/posts/post/:postIdx
  app.get("/app/posts/post/:postIdx", post.getSinglePost);

  //2.7 GET 카테고리 별 게시글 조회 /app/posts/:userIdx/category/:cateIdx
  app.get("/app/posts/:userIdx/category/:cateIdx", post.getPostsByCategory);
};
