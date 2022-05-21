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
        Query String: userIdx
    */

  const userIdx = req.query.userIdx;

  // validation
  if (!userIdx) {
    return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
  }
  if (userIdx <= 0) {
    return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
  }

  const postListResult = await postProvider.retrievePostList(userIdx);
};
