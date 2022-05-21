const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveUserList = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const userListResult = await userDao.selectUserID(connection);
  connection.release();

  return userListResult;
};

exports.userIDCheck = async function (userID) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userIDCheckResult = await userDao.selectUserID(connection, userID);
  connection.release();

  return userIDCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.accountCheck = async function (userID) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, userID);
  connection.release();

  return userAccountResult;
};