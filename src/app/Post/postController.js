const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const postService = require("./postService");
const postProvider = require("./postProvider");

/*
    API NO 3.1
    API NAME: 게시물 조회 API
    (GET) /posts?useridx=
 */
//hi
exports.getPosts = async function (req, res) {
  /*
        Params: userIdx
    */
  const userIdx = req.params.userIdx;
  const postListResult = await postProvider.retrievePostList(userIdx);

  return res.send(response(baseResponse.SUCCESS, postListResult));
  // const postListResult = await postProvider.retrievePostList(userIdx);
};
