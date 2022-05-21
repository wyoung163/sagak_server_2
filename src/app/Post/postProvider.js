const { pool } = require("../../../config/database");
const postDao = require("./postDao");

exports.retrieveUserPosts = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userPostsResult = await postDao.selectUserPosts(connection, userIdx);

  connection.release();
  return userPostsResult;
};

retrieveTitleList = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const tilteListResult = await postDao.getTitleList(connection, userIdx);
  connection.release();

  return tilteListResult;
};

exports.retrievePostList = async function (userIdx) {
  const names = await retrieveTitleList(userIdx);

  const connection = await pool.getConnection(async (conn) => conn);

  var postListResult = [];

  for (var i = 0; i < names.length; i++) {
    const item = await postDao.selectUserPosts(
      connection,
      userIdx,
      names[i].title
    );
    postListResult.push(item);
  }

  connection.release();

  return postListResult;
};

exports.retrievePostListByTitle = async function (userIdx, postTitle) {
  const connection = await pool.getConnection(async (conn) => conn);

  const postListResult = await postDao.selectUserPosts(
    connection,
    userIdx,
    postTitle
  );

  connection.release();

  return postListResult;
};

exports.retrievePostByPostIdx = async function (postIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  var postResult = await postDao.selectPostbyIdx(connection, postIdx);
  const imgUrls = await postDao.getImgUrlByPostIdx(connection, postIdx);
  connection.release();
  return [postResult[0], imgUrls];
};
