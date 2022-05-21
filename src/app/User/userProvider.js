const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveUserList = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const userListResult = await userDao.selectUser(connection);
  connection.release();

  return userListResult;
};
