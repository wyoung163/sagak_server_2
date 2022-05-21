const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const postService = require("./postService");
const postProvider = require("./postProvider");

// /*
//     API NO 2.4
//     API NAME: 게시글 조회 - 리스트 API
//     (GET) /app/posts/:userIdx
//  */
// exports.getPosts = async function (req, res) {
//   /*
//         Params: userIdx
//     */
//   const userIdx = req.params.userIdx;
//   const postListResult = await postProvider.retrievePostList(userIdx);

//   return res.send(response(baseResponse.SUCCESS, postListResult));
// };

/*
    API NO 2.5
    API NAME: 제목 같은 게시글 조회 - 리스트
    (GET) /app/posts/:userIdx?postTitle=
 */

exports.getPostsByTitle = async function (req, res) {
  /* 
      params: userIdx
      query: postTitle
    */
  const userIdx = req.params.userIdx;
  const postTitle = req.query.postTitle;

  if (!postTitle) {
    /*
    API NO 2.4
    API NAME: 게시글 조회 - 리스트 API
    (GET) /app/posts/:userIdx
   */
    const userIdx = req.params.userIdx;
    const postListResult = await postProvider.retrievePostList(userIdx);

    return res.send(response(baseResponse.SUCCESS, postListResult));
  }

  const postListResultbyTitle = await postProvider.retrievePostListByTitle(
    userIdx,
    postTitle
  );
  return res.send(response(baseResponse.SUCCESS, postListResultbyTitle));
};

/*
    API NO 2.6
    API NAME: 개별 게시글 조회
    (GET) /app/posts/post/:postIdx
 */

exports.getSinglePost = async function (req, res) {
  /* 
          params: postIdx
        */

  const postIdx = req.params.postIdx;

  const singlePostResult = await postProvider.retrievePostByPostIdx(postIdx);
  return res.send(response(baseResponse.SUCCESS, singlePostResult[0]));
};

exports.postSinglePost = async function (req, res) {};
