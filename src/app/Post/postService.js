const { pool } = require("../../../config/database");
const postDao = require("./postDao");
const baseResponse = require("../../../config/baseResponseStatus");

const { response } = require("../../../config/response");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createPost = async function (postInfo) {
  const connection = await pool.getConnection(async (conn) => conn);
  const insertUserInfoParams = [
    postInfo.userIdx,
    postInfo.title,
    postInfo.date,
    postInfo.place,
    postInfo.categoryIdx,
    postInfo.description,
  ];
  const postIdResult = await postDao.insertPostInfo(
    connection,
    insertUserInfoParams
  );

  console.log(`추가된 post : ${postIdResult.insertId}`);
  for (var i = 0; i < postInfo.imgUrl.length; i++) {
    const imgIdResult = await postDao.insertImgInfo(connection, [
      postIdResult.insertId,
      postInfo.imgUrl[i],
    ]);
    console.log(`추가된 url: ${imgIdResult.insertId}`);
  }

  connection.release();
  return response(baseResponse.SUCCESS);
};
